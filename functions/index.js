export async function onRequest(context) {
    const html = `
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Coinzy API</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #121212; color: #fff; }
                h1 { color: #ff6600; }
                .container { max-width: 800px; margin: 0 auto; }
                pre { background: #222; padding: 10px; border-radius: 5px; text-align: left; overflow-x: auto; }
                code { color: #0f0; }
                a { color: #ff6600; text-decoration: none; }
                a:hover { text-decoration: underline; }
                .section { margin: 20px 0; padding: 20px; background: #1e1e1e; border-radius: 5px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Willkommen zur Coinzy API</h1>
                <p>Die Coinzy API bietet verschiedene zufällige Inhalte für Discord-Bots.</p>
                <p>Hier erfährst du, wie du sie in <strong>Discord.js</strong>, <strong>Discord.py</strong> und <strong>Bot Designer for Discord (BDFD)</strong> nutzen kannst.</p>

                <div class="section">
                    <h2>🚀 Nutzung mit Discord.js (v14)</h2>
                    <pre><code>const { Client, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand() || interaction.commandName !== 'dog') return;

    const response = await fetch('https://coinzy-api.pages.dev/api/random-dog.js');
    const data = await response.json();

    await interaction.reply({ content: data.image });
});

client.login('DEIN_DISCORD_BOT_TOKEN');</code></pre>
                </div>

                <div class="section">
                    <h2>🐍 Nutzung mit Discord.py</h2>
                    <pre><code>import discord
import requests

bot = discord.Bot()

@bot.slash_command(name="dog", description="Zeigt ein zufälliges Hundebild")
async def dog(ctx):
    response = requests.get("https://coinzy-api.pages.dev/api/random-dog.js")
    data = response.json()
    await ctx.respond(data["image"])

bot.run("DEIN_DISCORD_BOT_TOKEN")</code></pre>
                </div>

                <div class="section">
                    <h2>🤖 Nutzung mit Bot Designer for Discord (BDFD)</h2>
                    <pre><code>$jsonRequest[https://coinzy-api.pages.dev/api/random-dog.js;image]</code></pre>
                </div>

                <p><a href="/api.js">📜 Alle verfügbaren API-Routen ansehen</a></p>
            </div>
        </body>
        </html>
    `;

    return new Response(html, { headers: { "Content-Type": "text/html" } });
}
