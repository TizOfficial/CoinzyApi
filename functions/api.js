export async function onRequest(context) {
    const apiRoutes = [
        {
            route: "/api/cuddle",
            description: "Gibt ein zufälliges kuschel gif zurück.",
            example: "https://coinzy-bot.pages.dev/api/cuudle"
        },
        {
            route: "/api/hug",
            description: "Gibt ein zufälliges Umarmungs Gif zurück.",
            example: "https://coinzy-bot.pages.dev/api/hug"
        },
        {
            route: "/api/kiss",
            description: "Gibt ein zufälliges Küss Gif zurück.",
            example: "https://coinzy-bot.pages.dev/api/kiss"
        },
        {
            route: "/api/pat",
            description: "Gibt ein zufälliges klopf Gif zurück.",
            example: "https://coinzy-bot.pages.dev/api/pat"
        },
        {
            route: "/api/slap",
            description: "Gibt eine zufälliges schlagen gif zurück.",
            example: "https://coinzy-bot.pages.dev/api/slap"
        },
        {
            route: "/api/random-cat",
            description: "Gibt ein Zufälliges Katzenbild zurück.",
            example: "https://coinzy-bot.pages.dev/api/random-cat"
        },
        {
            route: "/api/random-country",
            description: "Gibt eine zufällige stadt zurück.",
            example: "https://coinzy-bot.pages.dev/api/random-country"
        },
        {
            route: "/api/random-dog",
            description: "Gibt ein zufälliges Hundebild zurück.",
            example: "https://coinzy-bot.pages.dev/api/random-dog"
        },
        {
            route: "/api/random-gif",
            description: "Gibt eine zufälligen gif zurück.",
            example: "https://coinzy-bot.pages.dev/api/random-gif"
        },
        {
            route: "/api/random-meme",
            description: "Gibt ein zufälliges Meme zurück.",
            example: "https://coinzy-bot.pages.dev/api/random-meme"
        },
        {
            route: "/api/username",
            description: "Gibt eine zufällige username zurück.",
            example: "https://coinzy-bot.pages.dev/api/username"
        },
        
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
