export async function onRequest(context) {
    const url = new URL(context.request.url);
    const inviteCode = url.pathname.split("/").pop();

    if (!inviteCode) {
        return new Response(JSON.stringify({ error: "Kein Invite-Code angegeben." }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    try {
        const response = await fetch(`https://discord.com/api/v9/invites/${inviteCode}?with_counts=true&with_expiration=true`);
        const data = await response.json();

        if (response.status !== 200) {
            return new Response(JSON.stringify({ error: "Ungültiger oder abgelaufener Invite-Code." }), { status: response.status, headers: { "Content-Type": "application/json" } });
        }

        return new Response(JSON.stringify({
            invite_code: inviteCode,
            guild_name: data.guild?.name || "Unbekannt",
            guild_id: data.guild?.id || "Unbekannt",
            guild_icon: data.guild?.icon ? `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png` : null,
            member_count: data.approximate_member_count || 0,
            presence_count: data.approximate_presence_count || 0,
            inviter: data.inviter ? {
                username: data.inviter.username,
                discriminator: data.inviter.discriminator,
                avatar: data.inviter.avatar ? `https://cdn.discordapp.com/avatars/${data.inviter.id}/${data.inviter.avatar}.png` : null
            } : null,
            created_at: data.expires_at || "Permanent"
        }), { status: 200, headers: { "Content-Type": "application/json" } });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Interner Fehler", details: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
}
