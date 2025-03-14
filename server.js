const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
const port = 3099;

app.use(cors());
app.use(express.json());

// Setze EJS als Template-Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Landing Page
app.get("/", (req, res) => {
    res.render("index"); // Rendert `views/index.ejs`
});

// ✅ API Übersicht (JSON-Version)
app.get("/api", (req, res) => {
    res.json({
        message: "Willkommen zu Coinzy API v1",
        endpoints: {
            randomText: "/api/v1/random-text",
            randomCat: "/api/v1/random-cat",
            randomDog: "/api/v1/random-dog",
            randomMeme: "/api/v1/random-meme",
            randomNumber: "/api/v1/random-number",
            randomColor: "/api/v1/random-color",
            randomQuote: "/api/v1/random-quote"
        }
    });
});

// ✅ Zufälliger Text
app.get("/api/v1/random-text", (req, res) => {
    const texts = [
        "Der frühe Vogel fängt den Wurm.",
        "Kein Plan überlebt den ersten Feindkontakt.",
        "Träume groß und wage es, Fehler zu machen.",
        "Harte Arbeit schlägt Talent, wenn Talent nicht hart arbeitet.",
        "Jede Reise beginnt mit einem einzigen Schritt."
    ];
    res.json({ text: texts[Math.floor(Math.random() * texts.length)], uploadedAt: new Date().toISOString() });
});

// ✅ Zufälliges Katzenbild
app.get("/api/v1/random-cat", async (req, res) => {
    try {
        const response = await axios.get("https://api.thecatapi.com/v1/images/search");
        res.json({ imageUrl: response.data[0].url, source: "The Cat API", uploadedAt: new Date().toISOString() });
    } catch (error) {
        console.error("Fehler bei /random-cat:", error.message);
        res.status(500).json({ error: "Fehler beim Abrufen des Katzenbildes." });
    }
});

// ✅ Zufälliges Hundebild
app.get("/api/v1/random-dog", async (req, res) => {
    try {
        const response = await axios.get("https://dog.ceo/api/breeds/image/random");
        res.json({ imageUrl: response.data.message, source: "Dog CEO API", uploadedAt: new Date().toISOString() });
    } catch (error) {
        console.error("Fehler bei /random-dog:", error.message);
        res.status(500).json({ error: "Fehler beim Abrufen des Hundebildes." });
    }
});

// ✅ Zufälliges Meme
app.get("/api/v1/random-meme", async (req, res) => {
    try {
        const response = await axios.get("https://meme-api.com/gimme");
        res.json({ 
            title: response.data.title, 
            imageUrl: response.data.url, 
            source: "Meme API", 
            uploadedAt: new Date().toISOString() 
        });
    } catch (error) {
        console.error("Fehler bei /random-meme:", error.message);
        res.status(500).json({ error: "Fehler beim Abrufen des Memes." });
    }
});

// ✅ Zufällige Zahl (1-1000)
app.get("/api/v1/random-number", (req, res) => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    res.json({ number: randomNumber, uploadedAt: new Date().toISOString() });
});

// ✅ Zufällige Farbe (HEX-Code)
app.get("/api/v1/random-color", (req, res) => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
    res.json({ color: randomColor, uploadedAt: new Date().toISOString() });
});

// ✅ Zufälliges Zitat (Motivation)
app.get("/api/v1/random-quote", (req, res) => {
    const quotes = [
        { text: "Deine Zeit ist begrenzt, also verschwende sie nicht damit, das Leben eines anderen zu leben.", author: "Steve Jobs" },
        { text: "Erfolg ist die Summe kleiner Anstrengungen, die Tag für Tag wiederholt werden.", author: "Robert Collier" },
        { text: "Mut steht am Anfang des Handelns, Glück am Ende.", author: "Demokrit" },
        { text: "Man kann nicht zurückgehen und den Anfang ändern, aber man kann starten, wo man ist, und das Ende verändern.", author: "C. S. Lewis" }
    ];
    res.json({ ...quotes[Math.floor(Math.random() * quotes.length)], uploadedAt: new Date().toISOString() });
});

// ✅ Server starten
app.listen(port, () => {
    console.log(`✅ API läuft unter: http://localhost:${port}`);
});