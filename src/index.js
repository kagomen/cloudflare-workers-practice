import user from './data.json'
import html from './example.html'
import { weather } from './weather.js'

export default {
	async fetch(request, env, ctx) {

		// jsonデータを出力
		// return new Response(JSON.stringify(user), {
		// 	headers: {
		// 		'content-type': 'application/json'
		// 	}
		// })

		// htmlを出力
		// return new Response(html, {
		// 	headers: {
		// 		'content-type': 'text/html'
		// 	}
		// })

		// Requestのcfプロパティを出力
		// return new Response(JSON.stringify(request.cf), {
		// 	headers: {
		// 		'content-type': 'application/json'
		// 	}
		// })

		const lat = request.cf.latitude
		const lon = request.cf.longitude
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${env.API_KEY}`
		const response = await fetch(url)
		const data = await response.json()
		return new Response(weather(data), {
			headers: {
				'content-type': 'text/html;charset=utf-8;'
			}
		})
	}
}
