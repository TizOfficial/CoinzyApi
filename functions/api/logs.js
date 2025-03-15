export async function onRequest(context) {
    try {
        const { env } = context;
        const db = env.DB;
        const logs = await db.prepare("SELECT * FROM logs ORDER BY timestamp DESC LIMIT 50").all();

        return new Response(JSON.stringify(logs.results), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Fehler beim Abrufen der Logs" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
