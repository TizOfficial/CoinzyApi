export async function onRequest(context) {
    try {
        const response = await fetch("https://nekos.best/api/v2/kiss");
        const data = await response.json();
        return new Response(JSON.stringify({ gif: data.results[0].url }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Fehler beim Abrufen des GIFs" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
