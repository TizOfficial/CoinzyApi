import { Buffer } from "node:buffer";
import Jimp from "jimp";

export async function onRequest(context) {
    if (context.request.method !== "POST") {
        return new Response(JSON.stringify({ error: "Only POST method allowed" }), {
            status: 405,
            headers: { "Content-Type": "application/json" }
        });
    }

    try {
        const url = new URL(context.request.url);
        const smoothness = parseInt(url.searchParams.get("smoothness")) || 7;
        const outlineStrength = parseInt(url.searchParams.get("outlineStrength")) || 8;
        const colorReduction = parseInt(url.searchParams.get("colorReduction")) || 20;
        const mode = url.searchParams.get("mode") || "classic";

        const arrayBuffer = await context.request.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const image = await Jimp.read(buffer);

        // Cartoon Effekt anwenden
        image.posterize(colorReduction);

        if (mode === 'vivid') {
            image.brightness(0.1).contrast(0.2);
        } else if (mode === 'pastel') {
            image.brightness(0.2).saturate(-0.3);
        }

        for (let i = 0; i < smoothness; i++) {
            image.blur(1);
        }

        const edges = image.clone().greyscale().convolute([
            [-1, -1, -1],
            [-1, 8, -1],
            [-1, -1, -1]
        ]);
        edges.opacity(outlineStrength / 10);

        image.composite(edges, 0, 0);

        // Bild als Base64 kodieren
        const base64 = await image.getBase64Async(Jimp.MIME_PNG);

        return new Response(JSON.stringify({
            status: "success",
            cartoonImage: base64
        }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Image processing failed" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
