export async function onRequest(context) {
    const response = await fetch("https://api.mojang.com/users/profiles/minecraft/" + generateRandomName());
    const data = await response.json();

    if (!data.id) {
        return new Response(JSON.stringify({ error: "Kein Skin gefunden!" }), { status: 404 });
    }

    return new Response(JSON.stringify({ skin: `https://crafatar.com/renders/body/${data.id}` }), {
        headers: { "Content-Type": "application/json" }
    });
}

function generateRandomName() {
    const names = ["Steve", "Alex", "Herobrine", "Notch", "Dream"];
    return names[Math.floor(Math.random() * names.length)];
}
