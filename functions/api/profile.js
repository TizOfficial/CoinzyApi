export async function onRequest(context) {
    const { searchParams } = new URL(context.request.url);
    const userId = searchParams.get("user");

    if (!userId) {
        return new Response(JSON.stringify({ error: "Kein Benutzer angegeben!" }), { status: 400 });
    }

    const userData = await context.env.USER_DB.get(`session_${userId}`);
    if (!userData) {
        return new Response(JSON.stringify({ error: "Benutzer nicht gefunden!" }), { status: 404 });
    }

    return new Response(userData, { status: 200, headers: { "Content-Type": "application/json" } });
}
