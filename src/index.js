import { Hono } from 'hono'
import user from './lib/data.json'
import html from './lib/example.html'
import { weather } from './lib/weather.js'

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

// Cloudflare WorkersのfetchイベントをHonoに委譲
export default app
