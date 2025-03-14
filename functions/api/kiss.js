export async function onRequest(context) {
    const API_KEY = "LIVDSRZULELA"; // Falls du einen eigenen API Key hast, ersetze ihn hier
    const url = \`https://g.tenor.com/v1/random?q=anime-kiss&key=\${API_KEY}&limit=1\`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            return new Response(JSON.stringify({ error: "Kein GIF gefunden, API könnte überlastet sein." }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify({ gif: data.results[0].media[0].gif.url }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: \`API-Fehler: \${error.message}\` }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
