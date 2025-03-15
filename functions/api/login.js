export async function onRequest(context) {
    const CLIENT_ID = "1319997838628753418";
    const REDIRECT_URI = "https://coinzy-bot.pages.dev/api/callback";

    const url = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify%20email`;

    return Response.redirect(url, 302);
}
