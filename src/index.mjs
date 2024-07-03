import { Hono } from 'hono'
import user from './lib/data.json'
import html from './lib/example.html'
import { weather } from './lib/weather.js'
import implicitRenderHtml from './lib/implicit.html'
import explicitRenderHtml from './lib/explicit.html'

const app = new Hono()

app.get('/', (c) => {
	return c.text('hello ^. _ . ^ ')
})

// jsonデータを出力するエンドポイント
app.get('/json', (c) => {
	return c.json(user)
})

// htmlを出力するエンドポイント
app.get('/html', (c) => {
	return c.html(html)
})

// Requestのcfプロパティを出力するエンドポイント
app.get('/cf', (c) => {
	return c.json(c.req.raw.cf)
})

// 天気情報をAPIから取得・HTMLで表示するエンドポイント
app.get('/weather', async (c) => {
	const cf = c.req.raw.cf
	if (!cf) {
		return c.json({ error: 'cf property not found' }, 400)
	}
	const lat = cf.latitude
	const lon = cf.longitude
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${c.env.API_KEY}`
	const response = await fetch(url)
	const data = await response.json()
	return c.html(weather(data))
})

// KVストアに値をセットして取得するエンドポイント
app.get('/kv', async (c) => {
	await c.env.KV_COUNT.put('name', 'kagome')
	let name = await c.env.KV_COUNT.get('name')
	return c.text(name)
})

async function handlePost(request, env) {
	const body = await request.formData()
	console.log('body', body)

	// トークンを取得
	const token = body.get('cf-turnstile-response')

	// リクエスト送信者のIPアドレスを取得
	const ip = request.header('CF-Connecting-IP')

	// （新規）フォームデータにsecret, response, remoteipを追加
	let formData = new FormData()
	formData.append('secret', env.TURNSTILE_SECRET_KEY)
	formData.append('response', token)
	formData.append('remoteip', ip)

	// Cloudflareの/siteverifyエンドポイントにPOSTリクエストを送信（検証を依頼）
	const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		body: formData,
		method: 'POST',
	})

	// 検証結果
	const outcome = await result.json()
	console.log('outcome', outcome)

	// 検証失敗時の処理（早期リターン）
	if (!outcome.success) {
		return new Response('The provided Turnstile token was not valid! \n' + JSON.stringify(outcome))
	}

	// 検証成功時の処理
	// The Turnstile token was successfuly validated. Proceed with your application logic.
	// Validate login, redirect user, etc.
	// For this demo, we just echo the "/siteverify" response:
	return new Response('Turnstile token successfuly validated. \n' + JSON.stringify(outcome))
}

app.post('/turnstile', async (c) => {
	console.log('c.req', c.req)
	const response = await handlePost(c.req, c.env)
	return response
})

app.get('/turnstile', (c) => {
	const url = new URL(c.req.url)
	let body = implicitRenderHtml
	if (url.pathname === '/explicit') {
		body = explicitRenderHtml
	}

	return c.html(body)
})

// Cloudflare WorkersのfetchイベントをHonoに委譲
export default app
