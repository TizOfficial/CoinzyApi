export async function onRequest(context) {
    const key = crypto.randomUUID();
    await context.env.API_KEYS.put(key, "active");

    return new Response(JSON.stringify({ apiKey: key }), {
        headers: { "Content-Type": "application/json" }
    });
}
