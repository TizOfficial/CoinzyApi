export async function onRequest(context) {
    const STRIPE_SECRET = context.env.STRIPE_SECRET;
    const endpointSecret = context.env.STRIPE_WEBHOOK_SECRET;
    
    const body = await context.request.text();
    const sig = context.request.headers.get('stripe-signature');

    // Webhook-Signatur validieren
    const crypto = await import('node:crypto');
    const hmac = crypto.createHmac("sha256", endpointSecret);
    hmac.update(body);
    const expectedSignature = `t=${Date.now()},v1=${hmac.digest("hex")}`;

    if (sig !== expectedSignature) {
        return new Response(JSON.stringify({ error: "Invalid signature" }), { status: 400 });
    }

    // Stripe-Event parsen
    const event = JSON.parse(body);
    
    if (event.type === 'checkout.session.completed') {
        const userId = event.data.object.metadata?.user_id;

        if (userId) {
            // Speichere die Zahlung in Cloudflare KV
            await context.env.PAYMENTS.put(userId, "paid"); 
        }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}
