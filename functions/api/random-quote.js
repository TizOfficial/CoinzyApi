export async function onRequest(context) {
    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        return new Response(JSON.stringify({ quote: data.content, author: data.author }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Fehler beim Abrufen des Zitats." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
