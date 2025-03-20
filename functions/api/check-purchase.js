
export async function onRequest(context) {
    const url = new URL(context.request.url);
    const userId = url.searchParams.get("user_id");

    if (!userId) {
        return new Response(JSON.stringify({ success: false, error: "User-ID fehlt!" }), { status: 400 });
    }

    const status = await context.env.PAYMENTS.get(userId);

    return new Response(JSON.stringify({ success: status === "paid" }));
}
