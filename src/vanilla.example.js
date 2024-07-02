import { jsonHandler } from './handler/jsonHandler'
import { htmlHandler } from './handler/htmlHandler'
import { cfHandler } from './handler/cfHandler'
import { weatherHandler } from './handler/weatherHandler'
import { kvHandler } from './handler/kvHandler'

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url)
		console.log(request)

		if (url.pathname === '/json') {
			return jsonHandler()
		} else if (url.pathname === '/html') {
			return htmlHandler()
		} else if (url.pathname === '/cf') {
			return cfHandler(request)
		} else if (url.pathname === '/weather') {
			return weatherHandler(request, env)
		} else {
			return kvHandler(env)
		}
	},
}
