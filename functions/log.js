import { DB } from '@cloudflare/d1'; // Falls du Cloudflare D1 nutzt

export async function onRequest(context) {
    try {
        const { request, env } = context;
        const url = new URL(request.url);
        const ip = request.headers.get("CF-Connecting-IP") || "Unbekannt";
        const userAgent = request.headers.get("User-Agent") || "Unbekannt";
        const route = url.pathname;
        const timestamp = new Date().toISOString();

        // In DB speichern
        const db = env.DB; // Cloudflare D1 DB
        await db.prepare(
            "INSERT INTO logs (ip, user_agent, route, timestamp) VALUES (?, ?, ?, ?)"
        ).bind(ip, userAgent, route, timestamp).run();

        return new Response(JSON.stringify({ success: true, message: "Request logged" }), {
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Fehler beim Logging" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
