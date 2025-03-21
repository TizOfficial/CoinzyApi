export async function onRequest(context) {
    const url = new URL(context.request.url);
    const userId = url.searchParams.get("user_id");

    if (!userId) {
        return new Response(JSON.stringify({ error: "user_id erforderlich." }), { status: 400 });
    }

    // Bot-Token aus Cloudflare-Umgebung abrufen
    const botToken = context.env.DISCORD_BOT_TOKEN;
    if (!botToken) {
        return new Response(JSON.stringify({ error: "Bot-Token nicht konfiguriert." }), { status: 500 });
    }

    try {
        // Benutzer-Info abrufen
        const userResponse = await fetch(`https://discord.com/api/v10/users/${userId}`, {
            headers: { Authorization: `Bot ${botToken}` }
        });

        if (!userResponse.ok) {
            return new Response(JSON.stringify({ error: "Ungültige User-ID oder keine Berechtigung." }), { status: 403 });
        }

        const userData = await userResponse.json();

        // Avatar-URL erstellen
        const avatarUrl = userData.avatar 
            ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.${userData.avatar.startsWith("a_") ? "gif" : "png"}`
            : null;

        // Banner-URL abrufen
        let bannerUrl = null;
        if (userData.banner) {
            bannerUrl = `https://cdn.discordapp.com/banners/${userData.id}/${userData.banner}.${userData.banner.startsWith("a_") ? "gif" : "png"}`;
        }

        // Discord-Snowflake ID in Datum umrechnen
        const discordEpoch = 1420070400000;
        const timestamp = parseInt(userData.id) / 4194304 + discordEpoch;
        const createdAt = new Date(timestamp).toISOString();

        // User-Flags (Badges) übersetzen
        const userFlags = {
            1: "Discord Staff",
            2: "Discord Partner",
            4: "HypeSquad Events",
            8: "Bug Hunter Level 1",
            64: "HypeSquad Bravery",
            128: "HypeSquad Brilliance",
            256: "HypeSquad Balance",
            512: "Early Supporter",
            16384: "Bug Hunter Level 2",
            131072: "Verified Bot Developer",
            4194304: "Active Developer"
        };

        const badges = [];
        if (userData.public_flags) {
            Object.keys(userFlags).forEach(flag => {
                if (userData.public_flags & flag) {
                    badges.push(userFlags[flag]);
                }
            });
        }

        // Guild-Member Infos abrufen (Präsenz, Nitro, Boosts)
        const memberResponse = await fetch(`https://discord.com/api/v10/guilds/YOUR_GUILD_ID/members/${userId}`, {
            headers: { Authorization: `Bot ${botToken}` }
        });

        let memberData = {};
        if (memberResponse.ok) {
            memberData = await memberResponse.json();
        }

        return new Response(JSON.stringify({
            id: userData.id,
            username: userData.username,
            discriminator: userData.discriminator,
            global_name: userData.global_name || userData.username,
            bot: userData.bot || false,
            system: userData.system || false,
            avatar_url: avatarUrl,
            banner_url: bannerUrl,
            accent_color: userData.accent_color || null,
            created_at: createdAt,
            badges: badges,
            nitro_type: memberData.premium_type || 0,
            boosting_since: memberData.premium_since || null,
            presence: memberData.presence || "Unknown",
            mfa_enabled: userData.mfa_enabled || false,
            locale: userData.locale || "Unknown",
            verified: userData.verified || false,
            email: userData.email || "Nicht verfügbar"
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Interner Fehler", details: error.message }), { status: 500 });
    }
}
