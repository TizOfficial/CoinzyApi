export async function onRequest(context) {
    const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
    const joke = await response.json();

    return new Response(JSON.stringify({ joke: joke.joke }), {
        headers: { "Content-Type": "application/json" }
    });
}
