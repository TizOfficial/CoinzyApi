export async function onRequestPost(context) {
    const { request, env } = context;
    const db = env.DB;
    
    const { username, email } = await request.json();
    if (!username || !email) {
        return new Response(JSON.stringify({ error: "Fehlende Daten" }), { status: 400 });
    }

    await db.prepare(
        "INSERT INTO users (username, email) VALUES (?, ?)"
    ).bind(username, email).run();

    return new Response(JSON.stringify({ success: true }), { status: 201 });
}
