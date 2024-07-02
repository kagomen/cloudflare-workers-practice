import html from '../lib/example.html'

export async function htmlHandler() {
	return new Response(html, {
		headers: {
			'content-type': 'text/html',
		},
	})
}
