export async function onRequest(context) {
    try {
        const id = Math.floor(Math.random() * 898) + 1; // 1-898 (Pokédex)
        const response = await fetch(\`https://pokeapi.co/api/v2/pokemon/\${id}\`);
        const data = await response.json();

        return new Response(JSON.stringify({ name: data.name, image: data.sprites.front_default }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Fehler beim Abrufen des Pokémon." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
