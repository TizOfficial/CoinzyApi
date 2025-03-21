export async function onRequest(context) {
    const url = new URL(context.request.url);
    const userId = url.searchParams.get("user_id");

    if (!userId) {
        return new Response(JSON.stringify({ error: "user_id erforderlich." }), { status: 400 });
    }

    const botToken = context.env.DISCORD_BOT_TOKEN;
    if (!botToken) {
        return new Response(JSON.stringify({ error: "Bot-Token nicht konfiguriert." }), { status: 500 });
    }

    try {
        // Benutzer-Infos abrufen
        const userResponse = await fetch(`https://discord.com/api/v10/users/${userId}`, {
            headers: { Authorization: `Bot ${botToken}` }
        });

        if (!userResponse.ok) {
            return new Response(JSON.stringify({ error: "Ungültige User-ID oder keine Berechtigung." }), { status: 403 });
        }

        const userData = await userResponse.json();

        // Avatar & Banner URL generieren
        const avatarUrl = userData.avatar 
            ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.${userData.avatar.startsWith("a_") ? "gif" : "png"}`
            : null;

        const bannerUrl = userData.banner 
            ? `https://cdn.discordapp.com/banners/${userData.id}/${userData.banner}.${userData.banner.startsWith("a_") ? "gif" : "png"}`
            : null;

        // Discord Snowflake → Erstellungsdatum
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

        // Basis-Infos für die Antwort
        const result = {
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
            badges: badges.length > 0 ? badges : undefined
        };

        // Gilden-spezifische Infos abrufen (wenn Bot in einer bestimmten Gilde ist)
        const guildId = context.env.DISCORD_GUILD_ID; // In Cloudflare ENV setzen
        if (guildId) {
            const memberResponse = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, {
                headers: { Authorization: `Bot ${botToken}` }
            });

            if (memberResponse.ok) {
                const memberData = await memberResponse.json();
                
                // Nitro & Boost Infos nur hinzufügen, wenn sie existieren
                if (memberData.premium_type) result.nitro_type = memberData.premium_type;
                if (memberData.premium_since) result.boosting_since = memberData.premium_since;

                // Rollen anzeigen (nur IDs, da Namen API-intensiver wären)
                if (memberData.roles.length > 0) result.roles = memberData.roles;
            }
        }

        // Präsenzstatus abrufen
        const presenceResponse = await fetch(`https://discord.com/api/v10/users/${userId}/presence`, {
            headers: { Authorization: `Bot ${botToken}` }
        });

        if (presenceResponse.ok) {
            const presenceData = await presenceResponse.json();
            result.presence = presenceData.status || "offline";

            // Geräte anzeigen (PC, Mobile, Web)
            result.devices = presenceData.client_status ? presenceData.client_status : {};
            
            // Aktivität abrufen (z. B. spielt ein Spiel, hört Spotify)
            if (presenceData.activities && presenceData.activities.length > 0) {
                result.activities = presenceData.activities.map(activity => ({
                    name: activity.name,
                    type: activity.type,
                    details: activity.details || null,
                    state: activity.state || null
                }));
            }
        }

        return new Response(JSON.stringify(result, null, 2), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Interner Fehler", details: error.message }), { status: 500 });
    }
}
