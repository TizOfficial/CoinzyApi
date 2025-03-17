export async function onRequest(context) {
    const url = new URL(context.request.url);
    const apiKey = url.searchParams.get("key");

    // 🔹 Lade die gültigen API-Keys aus deiner GitHub-JSON-Datei
    const keysResponse = await fetch("https://raw.githubusercontent.com/TizOfficial/CoinzyApi/main/keys.json");
    const keysData = await keysResponse.json();

    if (!apiKey || !keysData.keys.includes(apiKey)) {
        return new Response(JSON.stringify({ error: "Ungültiger API-Key!" }), { status: 403 });
    }

    return new Response(JSON.stringify({ message: "API-Zugriff erlaubt!" }));
}
