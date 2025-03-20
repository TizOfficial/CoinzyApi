export async function onRequest(context) {
    const urlObj = new URL(context.request.url);
    const websiteURL = urlObj.searchParams.get("url");
    const fullPage = urlObj.searchParams.get("full_page") || "false";
    const width = urlObj.searchParams.get("width") || "1280";
    const height = urlObj.searchParams.get("height") || "720";

    if (!websiteURL) {
        return new Response(JSON.stringify({ error: "Bitte eine URL angeben!" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }

    try {
        // ScreenshotAPI-Netzwerkaufruf
        const API_KEY = "EC98G7X-NM94Y4E-KM2NV23-9VPNTBX"; // Hier deinen API-Key einfügen
        const apiURL = `https://shot.screenshotapi.net/screenshot?token=${API_KEY}&url=${encodeURIComponent(websiteURL)}&full_page=${fullPage}&width=${width}&height=${height}`;

        const response = await fetch(apiURL);
        const data = await response.json();

        if (!data.screenshot) {
            return new Response(JSON.stringify({ error: "Screenshot konnte nicht erstellt werden." }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify({ screenshot_url: data.screenshot }), {
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
