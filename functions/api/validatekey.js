export async function validateKey(request, env) {
    const { searchParams } = new URL(request.url);
    const apiKey = searchParams.get("key");

    if (!apiKey) {
        return new Response(JSON.stringify({ error: "API-Key erforderlich!" }), { status: 403 });
    }

    const keyExists = await env.API_KEYS.get(apiKey);
    if (!keyExists) {
        return new Response(JSON.stringify({ error: "Ungültiger API-Key!" }), { status: 403 });
    }
    
    return null; // Erlaubt den Zugriff
}
