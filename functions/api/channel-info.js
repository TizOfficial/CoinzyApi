export async function onRequest(context) {
    const url = new URL(context.request.url);
    const channelId = url.searchParams.get("channel_id");

    if (!channelId) {
        return new Response(JSON.stringify({ error: "channel_id erforderlich." }), { status: 400 });
    }

    // Token aus den Environment Variables von Cloudflare Pages holen
    const botToken = context.env.DISCORD_BOT_TOKEN;
    if (!botToken) {
        return new Response(JSON.stringify({ error: "Bot-Token nicht konfiguriert." }), { status: 500 });
    }

    const response = await fetch(`https://discord.com/api/v10/channels/${channelId}`, {
        headers: { Authorization: `Bot ${botToken}` }
    });

    if (!response.ok) {
        return new Response(JSON.stringify({ error: "Ungültige Channel-ID oder keine Berechtigung." }), { status: 403 });
    }

    const data = await response.json();

    return new Response(JSON.stringify({
        id: data.id,
        name: data.name,
        type: data.type,
        topic: data.topic || "Kein Thema",
        nsfw: data.nsfw,
        position: data.position,
        created_at: new Date((BigInt(data.id) >> 22n) + 1420070400000n).toISOString()
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
