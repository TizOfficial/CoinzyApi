export async function onRequest(context) {
    const url = new URL(context.request.url);
    const prompt = url.searchParams.get("prompt") || "Ein epischer Cyberpunk-Krieger";

    try {
        const response = await fetch(`https://api.dallemini.ai/generate?prompt=${encodeURIComponent(prompt)}`);
        const data = await response.json();
        return new Response(JSON.stringify({ image: data.image_url }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Fehler beim Generieren des Bildes." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
