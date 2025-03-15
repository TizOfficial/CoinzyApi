export async function onRequest(context) {
    const players = ["Notch", "Dream", "Technoblade", "Alex", "Steve"];
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    const skinUrl = `https://mineskin.eu/body/${randomPlayer}`;
    const downloadUrl = `https://mineskin.eu/download/${randomPlayer}`;

    return new Response(JSON.stringify({ player: randomPlayer, skin: skinUrl, download: downloadUrl }), {
        headers: { "Content-Type": "application/json" }
    });
}
