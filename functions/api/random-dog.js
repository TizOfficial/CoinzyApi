export async function onRequest(context) {
  try {
    const response = await fetch("https://random.dog/woof.json");
    const data = await response.json();
    
    return new Response(JSON.stringify({ image: data.url }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch dog image" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
