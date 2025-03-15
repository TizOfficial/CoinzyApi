export async function onRequest(context) {
    const players = ["Notch", "Dream", "Technoblade", "Alex", "Steve"];
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    const skinUrl = `https://mineskin.eu/body/${randomPlayer}`;

    return new Response(JSON.stringify({ player: randomPlayer, skin: skinUrl }), {
        headers: { "Content-Type": "application/json" }
    });
}
