export async function onRequest(context) {
    const CLIENT_ID = "1319997838628753418";
    const CLIENT_SECRET = "34H4fVteldZJ0aJM4clkcEvTJoBkVsKq";
    const REDIRECT_URI = "https://coinzy-bot.pages.dev/api/callback";

    const { searchParams } = new URL(context.request.url);
    const code = searchParams.get("code");

    if (!code) {
        return new Response("Kein Code erhalten!", { status: 400 });
    }

    // Schritt 1: Code in Token umwandeln
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: "authorization_code",
            code: code,
            redirect_uri: REDIRECT_URI
        })
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
        return new Response("Fehler beim Abrufen des Tokens!", { status: 400 });
    }

    // Schritt 2: User-Daten abrufen
    const userResponse = await fetch("https://discord.com/api/users/@me", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });

    const userData = await userResponse.json();
    
    // Schritt 3: Nutzer speichern (optional)
    const sessionToken = btoa(userData.id + ":" + Date.now());
    await context.env.USER_DB.put(`session_${userData.id}`, JSON.stringify(userData), { expirationTtl: 86400 });

    // Schritt 4: Nutzer zur Profilseite weiterleiten
    return Response.redirect(`https://coinzy-bot.pages.dev/profile?user=${userData.id}`, 302);
}
