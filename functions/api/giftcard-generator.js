export async function onRequest(context) {
    const url = new URL(context.request.url);
    const amount = url.searchParams.get("amount") || "10"; // Standard: 10€
    const currency = url.searchParams.get("currency") || "EUR"; // Standard: Euro

    function generateGiftcardCode() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)])
            .join("")
            .match(/.{1,4}/g)
            .join("-");
    }

    const giftcard = {
        code: generateGiftcardCode(),
        amount: `${amount} ${currency}`,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString(), // 1 Jahr gültig
        generated_at: new Date().toISOString()
    };

    return new Response(JSON.stringify(giftcard), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}
