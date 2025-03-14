export async function onRequest(context) {
    try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const data = await response.json();
        const randomMeme = data.data.memes[Math.floor(Math.random() * data.data.memes.length)];
        
        return new Response(JSON.stringify({ meme: randomMeme.url, title: randomMeme.name }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Fehler beim Abrufen des Memes" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
