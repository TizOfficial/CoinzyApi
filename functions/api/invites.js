export async function onRequest(context) {
    const url = new URL(context.request.url);
    const inviteCode = url.searchParams.get("code");

    if (!inviteCode) {
        return new Response(JSON.stringify({ error: "Kein Invite-Code angegeben." }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }

    try {
        const response = await fetch(`https://discord.com/api/v9/invites/${inviteCode}?with_counts=true&with_expiration=true`);
        const data = await response.json();

        if (!response.ok) {
            return new Response(JSON.stringify({ error: "Ungültiger oder abgelaufener Invite-Code." }), {
                status: response.status,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Erstellungsdatum berechnen (Snowflake)
        let createdTimestamp = null;
        if (data.guild && data.guild.id) {
            const snowflake = BigInt(data.guild.id);
            createdTimestamp = new Date(Number((snowflake >> 22n) + 1420070400000n)).toISOString();
        }

        return new Response(JSON.stringify({
            invite_code: inviteCode,
            created_at: createdTimestamp || "Unbekannt",
            expires_at: data.expires_at || "Permanent",
            inviter: data.inviter ? {
                id: data.inviter.id,
                username: data.inviter.username,
                discriminator: data.inviter.discriminator,
                avatar: data.inviter.avatar ? `https://cdn.discordapp.com/avatars/${data.inviter.id}/${data.inviter.avatar}.png` : null
            } : null,
            guild: data.guild ? {
                id: data.guild.id,
                name: data.guild.name,
                created_at: createdTimestamp || "Unbekannt",
                description: data.guild.description || "Keine Beschreibung",
                icon: data.guild.icon ? `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png` : null,
                members: {
                    total: data.approximate_member_count ?? "Nicht verfügbar",
                    online: data.approximate_presence_count ?? "Nicht verfügbar"
                }
            } : null
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Interner Fehler", details: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
