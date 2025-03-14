export async function onRequest(context) {
    const API_KEY = "LIVDSRZULELA"; // Dein API Key hier
    const url = \`https://g.tenor.com/v1/random?q=anime-kiss&key=\${API_KEY}&limit=1\`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return new Response(JSON.stringify({ gif: data.results[0].media[0].gif.url }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Fehler beim Abrufen des GIFs" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
