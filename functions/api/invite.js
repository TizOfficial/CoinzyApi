export async function onRequestGet({ request }) {
    const url = new URL(request.url);
    const refCode = url.searchParams.get("ref");
    const KV_NAMESPACE = await env.INVITE_STORAGE; // KV-Speicher

    if (refCode) {
        const count = await KV_NAMESPACE.get(refCode) || 0;
        await KV_NAMESPACE.put(refCode, parseInt(count) + 1);
        return new Response("Danke für deine Einladung! 🎉", { status: 200 });
    }

    return new Response("Kein gültiger Invite-Link.", { status: 404 });
}
