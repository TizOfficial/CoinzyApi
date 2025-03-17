export async function onRequest(context) {
    const url = new URL(context.request.url);
    const refCode = url.searchParams.get("ref");
    const KV_NAMESPACE = context.env.INVITE_STORAGE; // Cloudflare KV

    if (!refCode) {
        return new Response("Kein Invite-Code angegeben!", { status: 400 });
    }

    let count = await KV_NAMESPACE.get(refCode);
    count = count ? parseInt(count) + 1 : 1;

    await KV_NAMESPACE.put(refCode, count.toString());

    return new Response(`Danke! Dein Invite-Code ${refCode} hat jetzt ${count} Einladungen.`, {
        status: 200
    });
}
