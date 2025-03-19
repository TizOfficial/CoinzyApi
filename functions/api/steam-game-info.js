export async function onRequest(context) {
    const { searchParams } = new URL(context.request.url);
    const appId = searchParams.get('id');
    const gameName = searchParams.get('name');

    if (!appId && !gameName) {
        return new Response(JSON.stringify({ error: "Bitte geben Sie entweder 'id' oder 'name' als Parameter an." }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    let gameData;

    if (appId) {
        gameData = await fetchGameDataById(appId);
    } else if (gameName) {
        gameData = await fetchGameDataByName(gameName);
    }

    if (!gameData) {
        return new Response(JSON.stringify({ error: "Spiel nicht gefunden." }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify(gameData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

async function fetchGameDataById(appId) {
    const apiUrl = `https://store.steampowered.com/api/appdetails?appids=${appId}&cc=de&l=de`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data[appId].success) {
        return formatGameData(data[appId].data);
    }
    return null;
}

async function fetchGameDataByName(gameName) {
    const searchUrl = `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(gameName)}&cc=de&l=de`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    if (searchData.items.length > 0) {
        const appId = searchData.items[0].id;
        return await fetchGameDataById(appId);
    }
    return null;
}

function formatGameData(data) {
    return {
        name: data.name,
        steam_appid: data.steam_appid,
        description: data.short_description,
        price: data.is_free ? "Kostenlos" : `${data.price_overview.final / 100} ${data.price_overview.currency}`,
        platforms: Object.keys(data.platforms).filter(platform => data.platforms[platform]),
        genres: data.genres.map(genre => genre.description),
        release_date: data.release_date.date,
        developers: data.developers,
        publishers: data.publishers,
        header_image: data.header_image,
        website: data.website
    };
}
