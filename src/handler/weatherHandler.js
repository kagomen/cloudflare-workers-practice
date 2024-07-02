import { weather } from '../lib/weather'

export async function weatherHandler(request, env) {
	const lat = request.cf.latitude
	const lon = request.cf.longitude
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${env.API_KEY}`
	const response = await fetch(url)
	const data = await response.json()
	return new Response(weather(data), {
		headers: {
			'content-type': 'text/html;charset=utf-8;',
		},
	})
}
