export async function onRequest(context) {
    try {
        const response = await fetch("https://g.tenor.com/v1/random?q=funny&key=LIVDSRZULELA");
        const data = await response.json();
        const gifUrl = data.results[0].media[0].gif.url;

        return new Response(JSON.stringify({ gif: gifUrl }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Fehler beim Abrufen des GIFs" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
