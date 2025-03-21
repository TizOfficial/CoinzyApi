export async function onRequest(context) {
    const url = new URL(context.request.url);
    const guildId = url.searchParams.get("guild_id");

    if (!guildId) {
        return new Response(JSON.stringify({ error: "guild_id erforderlich." }), { status: 400 });
    }

    // Bot-Token aus Cloudflare-Umgebung abrufen
    const botToken = context.env.DISCORD_BOT_TOKEN;
    if (!botToken) {
        return new Response(JSON.stringify({ error: "Bot-Token nicht konfiguriert." }), { status: 500 });
    }

    try {
        // Server-Info abrufen
        const guildResponse = await fetch(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, {
            headers: { Authorization: `Bot ${botToken}` }
        });

        if (!guildResponse.ok) {
            return new Response(JSON.stringify({ error: "Ungültige Server-ID oder keine Berechtigung." }), { status: 403 });
        }

        const guildData = await guildResponse.json();

        // Channels abrufen
        const channelsResponse = await fetch(`https://discord.com/api/v10/guilds/${guildId}/channels`, {
            headers: { Authorization: `Bot ${botToken}` }
        });

        if (!channelsResponse.ok) {
            return new Response(JSON.stringify({ error: "Konnte die Kanäle nicht abrufen." }), { status: 403 });
        }

        const channels = await channelsResponse.json();

        // Channel-Statistiken berechnen
        const textChannels = channels.filter(c => c.type === 0).length;
        const voiceChannels = channels.filter(c => c.type === 2).length;
        const categoryChannels = channels.filter(c => c.type === 4).length;
        const stageChannels = channels.filter(c => c.type === 13).length;
        const forumChannels = channels.filter(c => c.type === 15).length;
        const totalChannels = channels.length;

        return new Response(JSON.stringify({
            id: guildData.id,
            name: guildData.name,
            description: guildData.description || "Keine Beschreibung",
            icon_url: guildData.icon ? `https://cdn.discordapp.com/icons/${guildData.id}/${guildData.icon}.png` : null,
            banner_url: guildData.banner ? `https://cdn.discordapp.com/banners/${guildData.id}/${guildData.banner}.png` : null,
            splash_url: guildData.splash ? `https://cdn.discordapp.com/splashes/${guildData.id}/${guildData.splash}.png` : null,
            owner_id: guildData.owner_id,
            region: guildData.region || "Automatisch",
            member_count: guildData.approximate_member_count || "Nicht verfügbar",
            online_members: guildData.approximate_presence_count || "Nicht verfügbar",
            premium_tier: guildData.premium_tier,
            premium_subscription_count: guildData.premium_subscription_count || 0,
            verification_level: guildData.verification_level,
            mfa_level: guildData.mfa_level,
            explicit_content_filter: guildData.explicit_content_filter,
            default_message_notifications: guildData.default_message_notifications,
            roles_count: guildData.roles ? guildData.roles.length : 0,
            emojis_count: guildData.emojis ? guildData.emojis.length : 0,
            stickers_count: guildData.stickers ? guildData.stickers.length : 0,
            features: guildData.features || [],
            created_at: new Date((BigInt(guildData.id) >> 22n) + 1420070400000n).toISOString(),
            // Channel-Statistiken
            channels: {
                total: totalChannels,
                text: textChannels,
                voice: voiceChannels,
                categories: categoryChannels,
                stage: stageChannels,
                forum: forumChannels
            }
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Interner Fehler", details: error.message }), { status: 500 });
    }
          }
