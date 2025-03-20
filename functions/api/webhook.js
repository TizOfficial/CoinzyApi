export async function onRequest(context) {
    const STRIPE_SECRET = context.env.STRIPE_SECRET;
    const stripe = require('stripe')(STRIPE_SECRET);
    
    const body = await context.request.text();
    const sig = context.request.headers.get('stripe-signature');
    const endpointSecret = context.env.STRIPE_WEBHOOK_SECRET;

    try {
        const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
        
        if (event.type === 'checkout.session.completed') {
            const userId = event.data.object.metadata.user_id;
            
            // Speichere den Kaufstatus in Cloudflare KV
            await context.env.PAYMENTS.put(userId, "paid"); 

            return new Response(JSON.stringify({ success: true }));
        }

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400 });
    }
}
