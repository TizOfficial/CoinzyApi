const SUPABASE_URL = "https://tetqpmeophkzlnhdcrqs.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRldHFwbWVvcGhremxuaGRjcnFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNTk4MTIsImV4cCI6MjA1NzczNTgxMn0.FbND9RgLTd3bD6WAvHsfbNSqxOMulfmojbZfaHgbylU";

// Besucheranzahl abrufen und aktualisieren
async function updateVisitorCount() {
    try {
        const { data, error } = await fetch(`${SUPABASE_URL}/rest/v1/webdata`, {
            method: "GET",
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json());

        let visitors = data[0]?.visitors || 0;

        // Besucherzahl erhöhen
        visitors++;

        // Update in der Datenbank
        await fetch(`${SUPABASE_URL}/rest/v1/webdata?id=eq.1`, {
            method: "PATCH",
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ visitors })
        });

        // In HTML anzeigen
        document.getElementById("visitor-count").innerText = visitors;
    } catch (err) {
        console.error("Fehler beim Laden der Besucherzahlen:", err);
    }
}

// Beim Laden der Seite ausführen
document.addEventListener("DOMContentLoaded", updateVisitorCount);
