export async function onRequest(context) {
    const url = new URL(context.request.url);
    const apiKey = url.searchParams.get("key");

    // Lade gültige API-Keys
    const keysResponse = await fetch("https://raw.githubusercontent.com/TizOfficial/CoinzyApi/main/keys.json");
    const keysData = await keysResponse.json();

    if (!apiKey || !keysData.keys.includes(apiKey)) {
        window.location.href = "/403"; // Weiterleitung auf Fehlerseite("https://coinzy-bot.pages.dev/403"));
    }

    window.location.href = "/api"; // Weiterleitung auf Fehlerseite("https://coinzy-bot.pages.dev/api"));
}




const blockedCountries = ["RU", "CN", "DE"];

function checkCountry(userIP) {
    fetch(`https://ipapi.co/${userIP}/json/`)
        .then(res => res.json())
        .then(data => {
            if (blockedCountries.includes(data.country_code)) {
                window.location.href = "/403";
            }
        });
}
