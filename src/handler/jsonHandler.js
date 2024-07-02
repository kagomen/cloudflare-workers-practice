import user from '../lib/data.json'

export async function jsonHandler() {
	return new Response(JSON.stringify(user), {
		headers: {
			'content-type': 'application/json',
		},
	})
}
