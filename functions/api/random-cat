export async function onRequest(context) {
    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await response.json();
        return new Response(JSON.stringify({ image: data[0].url }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Fehler beim Abrufen des Katzenbilds" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
