export async function onRequest(context) {
    try {
        const response = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
        const data = await response.json();
        return new Response(JSON.stringify({ fact: data.text }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Fehler beim Abrufen des Fakts." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
