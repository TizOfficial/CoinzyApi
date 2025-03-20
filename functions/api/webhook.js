export async function onRequestPost(context) {
    const STRIPE_SECRET = context.env.STRIPE_SECRET; // In Cloudflare Pages als Environment Variable speichern

    const body = await context.request.json(); // Body auslesen
    const signature = context.request.headers.get("stripe-signature");

    // Webhook Secret von Stripe holen (ersetze durch dein echtes Webhook Secret)
    const webhookSecret = context.env.STRIPE_WEBHOOK_SECRET; 

    // Stripe API-Aufruf zur Verifizierung der Signatur
    const response = await fetch("https://api.stripe.com/v1/events/" + body.id, {
        headers: {
            Authorization: `Bearer ${STRIPE_SECRET}`
        }
    });

    if (response.status !== 200) {
        return new Response(JSON.stringify({ error: "Ungültige Anfrage" }), { status: 400 });
    }

    const event = await response.json();

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        
        // Hier kannst du die Zahlung weiterverarbeiten
        return new Response(JSON.stringify({ success: true, message: "Zahlung erfolgreich!" }), { status: 200 });
    }

    return new Response(JSON.stringify({ success: false, message: "Kein relevantes Event" }), { status: 400 });
}
