const ADMIN_PASSWORD = "timistcool";
const apiKeys = new Map([
    ["mein-super-key", "Owner"],
    ["test-key-123", "User"]
]);

export async function onRequest(context) {
    const url = new URL(context.request.url);
    const password = url.searchParams.get("password");
    const action = url.searchParams.get("action");
    const keyToDelete = url.searchParams.get("key");

    // Admin-Passwort prüfen
    if (password !== ADMIN_PASSWORD) {
        return new Response(JSON.stringify({ "error": "Unauthorized" }), {
            status: 403,
            headers: { "Content-Type": "application/json" }
        });
    }

    if (action === "list") {
        return new Response(JSON.stringify({
            "keys": Array.from(apiKeys.keys())
        }), { headers: { "Content-Type": "application/json" }});
    }

    if (action === "create") {
        const newKey = `user-${Math.random().toString(36).substring(2, 10)}`;
        apiKeys.set(newKey, "User");
        return new Response(JSON.stringify({ "new_key": newKey }), {
            headers: { "Content-Type": "application/json" }
        });
    }

    if (action === "delete" && keyToDelete) {
        if (apiKeys.has(keyToDelete)) {
            apiKeys.delete(keyToDelete);
            return new Response(JSON.stringify({ "message": "Key deleted" }), {
                headers: { "Content-Type": "application/json" }
            });
        } else {
            return new Response(JSON.stringify({ "error": "Key not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }
    }

    return new Response(JSON.stringify({ "error": "Invalid action" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
    });
}
