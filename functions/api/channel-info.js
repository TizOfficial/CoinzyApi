export async function onRequest(context) {
    const url = new URL(context.request.url);
    const channelId = url.searchParams.get("channel_id");

    if (!channelId) {
        return new Response(JSON.stringify({ error: "channel_id erforderlich." }), { status: 400 });
    }

    // Token aus den ENV-Variablen von Cloudflare Pages holen
    const botToken = context.env.DISCORD_BOT_TOKEN;
    if (!botToken) {
        return new Response(JSON.stringify({ error: "Bot-Token nicht konfiguriert." }), { status: 500 });
    }

    try {
        const response = await fetch(`https://discord.com/api/v10/channels/${channelId}`, {
            headers: { Authorization: `Bot ${botToken}` }
        });

        if (!response.ok) {
            return new Response(JSON.stringify({ error: "Ungültige Channel-ID oder keine Berechtigung." }), { status: response.status });
        }

        const data = await response.json();

        return new Response(JSON.stringify({
            id: data.id,
            name: data.name || "Kein Name",
            type: getChannelType(data.type),
            topic: data.topic || "Kein Thema",
            nsfw: data.nsfw || false,
            position: data.position || 0,
            parent_id: data.parent_id || "Keine Kategorie",
            parent_category: data.parent_id ? await getCategoryName(data.parent_id, botToken) : "Keine Kategorie",
            slowmode: data.rate_limit_per_user || 0, // Slowmode in Sekunden
            bitrate: data.bitrate || null, // Nur für Voice-Channels
            user_limit: data.user_limit || null, // Max User für Voice-Channels
            rtc_region: data.rtc_region || "Auto", // Sprach-Region
            video_quality_mode: data.video_quality_mode || "Standard",
            permission_overwrites: data.permission_overwrites || [], // Berechtigungen (Rollen & User)
            created_at: new Date((BigInt(data.id) >> 22n) + 1420070400000n).toISOString()
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Interner Fehler", details: error.message }), { status: 500 });
    }
}

// **Hilfsfunktion zum Umwandeln der Channel-Typ-ID in lesbare Namen**
function getChannelType(type) {
    const types = {
        0: "Text",
        1: "DM",
        2: "Voice",
        3: "Group DM",
        4: "Category",
        5: "News",
        10: "News Thread",
        11: "Public Thread",
        12: "Private Thread",
        13: "Stage",
        14: "Directory",
        15: "Forum"
    };
    return types[type] || "Unbekannt";
}

// **Hilfsfunktion zur Abfrage des Namens der Parent-Kategorie**
async function getCategoryName(categoryId, botToken) {
    try {
        const response = await fetch(`https://discord.com/api/v10/channels/${categoryId}`, {
            headers: { Authorization: `Bot ${botToken}` }
        });

        if (!response.ok) return "Unbekannte Kategorie";

        const categoryData = await response.json();
        return categoryData.name || "Unbekannte Kategorie";

    } catch {
        return "Unbekannte Kategorie";
    }
}
