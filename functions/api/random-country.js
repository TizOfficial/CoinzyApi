export async function onRequest(context) {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const randomCountry = data[Math.floor(Math.random() * data.length)];

        return new Response(JSON.stringify({
            country: randomCountry.name.common,
            capital: randomCountry.capital ? randomCountry.capital[0] : "Keine Hauptstadt",
            population: randomCountry.population,
            area: `${randomCountry.area} km²`,
            flag: randomCountry.flags.svg
        }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Fehler beim Abrufen des Landes" }), {
            status: 500
        });
    }
}
