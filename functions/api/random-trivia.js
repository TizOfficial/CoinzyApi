export async function onRequest(context) {
    const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
    const data = await response.json();
    
    return new Response(JSON.stringify(data.results[0]), {
        headers: { "Content-Type": "application/json" }
    });
}
