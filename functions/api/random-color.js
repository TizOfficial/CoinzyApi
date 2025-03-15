export async function onRequest(context) {
    function randomHexColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    return new Response(JSON.stringify({ color: randomHexColor() }), {
        headers: { "Content-Type": "application/json" }
    });
}
