export async function onRequest(context) {
    const apiRoutes = [
        {
            route: "/api/random-dog",
            description: "Gibt ein zufälliges Hundebild zurück.",
            example: "https://coinzy-bot.pages.dev/api/random-dog"
        },
        {
            route: "/api/nasaimage",
            description: "Gibt das NASA-Bild des Tages zurück.",
            example: "https://coinzy-bot.pages.dev/api/nasaimage"
        },
        {
            route: "/api/random-meme",
            description: "Gibt ein zufälliges Meme zurück.",
            example: "https://coinzy-bot.pages.dev/api/random-meme"
        },
        {
            route: "/api/minecraft-skin",
            description: "Gibt einen zufälligen Minecraft-Skin zurück.",
            example: "https://coinzy-bot.pages.dev/api/minecraft-skin"
        }
    ];

    const html = `
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Coinzy API</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
                h1 { color: #ff6600; }
                .route { margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
                a { color: #007bff; text-decoration: none; }
                a:hover { text-decoration: underline; }
            </style>
        </head>
        <body>
            <h1>Coinzy API</h1>
            <p>Willkommen zur Coinzy API! Hier sind die verfügbaren Endpunkte:</p>
            ${apiRoutes.map(route => `
                <div class="route">
                    <strong>${route.route}</strong><br>
                    ${route.description}<br>
                    <a href="${route.example}" target="_blank">Beispiel aufrufen</a>
                </div>
            `).join("")}
        </body>
        </html>
    `;

    return new Response(html, { headers: { "Content-Type": "text/html" } });
}
