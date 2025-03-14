export async function onRequest(context) {
    try {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();
        return new Response(JSON.stringify({ username: data.results[0].login.username }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Fehler beim Generieren des Namens." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
