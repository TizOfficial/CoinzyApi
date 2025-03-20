export async function onRequest(context) {
    const url = new URL(context.request.url);
    const prompt = url.searchParams.get("prompt");
    const size = url.searchParams.get("size") || "1024x1024";

    if (!prompt) {
        return new Response(JSON.stringify({ error: "Bitte einen Prompt angeben!" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }

    const OPENAI_API_KEY = context.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
        return new Response(JSON.stringify({ error: "API-Schlüssel fehlt!" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt, size, n: 1 })
        });

        if (!response.ok) {
            throw new Error(`Fehler von OpenAI: ${response.statusText}`);
        }

        const data = await response.json();
        return new Response(JSON.stringify({ image_url: data.data[0].url }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
