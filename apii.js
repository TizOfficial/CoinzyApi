export async function onRequest(context) {
    const url = new URL(context.request.url);
    const apiKey = url.searchParams.get("key");

    // Lade gültige API-Keys
    const keysResponse = await fetch("https://raw.githubusercontent.com/TizOfficial/CoinzyApi/main/keys.json");
    const keysData = await keysResponse.json();

    if (!apiKey || !keysData.keys.includes(apiKey)) {
        return new Response(await fetch("https://coinzy-bot.pages.dev/403"));
    }

    return new Response(await fetch("https://coinzy-bot.pages.dev/api"));
}
