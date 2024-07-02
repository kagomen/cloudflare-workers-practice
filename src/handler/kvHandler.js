export async function kvHandler(env) {
	await env.KV_COUNT.put('name', 'kagome')
	let name = await env.KV_COUNT.get('name')
	return new Response(name)
}
