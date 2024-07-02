export async function cfHandler(request) {
	return new Response(JSON.stringify(request.cf), {
		headers: {
			'content-type': 'application/json'
		}
	})
}
