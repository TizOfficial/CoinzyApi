export async function onRequest(context) {
    try {
        const response = await fetch("https://api.waifu.pics/sfw/cuddle");
        const data = await response.json();
        return new Response(JSON.stringify({ gif: data.url }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Fehler beim Abrufen des Cuddle-GIFs." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
