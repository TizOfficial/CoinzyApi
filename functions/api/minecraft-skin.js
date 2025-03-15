export async function onRequest(context) {
    const players = ["Notch", "Dream", "Technoblade", "Alex", "Steve", "Paluten", "Maudado", "Zombey", "Pandi", "Panda", "Ninja", "Sai", "Edoski", "Sothey", "Kole2tas", "Afford", "brwutal", "smungcats", "dnh", "vttn", "Kamyq21", "cel8", "Fritizee", "Eckify", "Tuvil", "pikayum"];
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    const skinUrl = `https://mineskin.eu/body/${randomPlayer}`;

    return new Response(JSON.stringify({ player: randomPlayer, skin: skinUrl }), {
        headers: { "Content-Type": "application/json" }
    });
}
