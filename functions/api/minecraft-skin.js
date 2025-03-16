export async function onRequest(context) {
    const players = ["Notch", "Dream", "Technoblade", "Alex", "Steve", "Paluten", "Maudado", "Zombey", "Pandi", "Panda", "Ninja", "Sai", "Edoski", "Sothey", "Kole2tas", "Afford", "brwutal", "smungcats", "dnh", "vttn", "Kamyq21", "cel8", "Fritizee", "Eckify", "Tuvil", "pikayum","Paranoia", "kormoisi", "FR3DYFAZB3R", "Seytl", "FinaleLarissa", "Sakura_hehe", "dollymeow", "GalaxyIsDum", "jazzyjazjas", "ARM5", "oogiefoogie", "MAS184", "SiquiXD", "Bxnker1e", "Soxil", "wartin", "Entendible", "axletol", "ImPenguin", "li_ja_h", "fyye", "Alaska0003", "Voidiskewl", "pikayum", "swavik", "CloudyW0lfie", "nikol_msc", "J0PERR", "efiyaXshirayuki", "FarBerry", "YAMASUKl", "Luvysss", "ksuw", "Crookenstein", "FoxxyBoxxy", "Maartjevn05", "r1yousan", "KrestonMC", "Toon_Icy", "JamesisDumb", "Chapey", "D4llas", "aamia", "Draggnx", "Ravhathaire", "Lyvant", "ShiranaiV", "BestWW_BURH", "nwath", "kiuana", "Chapey", "N6ty", "xnxx_mafia", "Sixela_BRZ", "KaiCoyote", "MicharcKeiner", "Magic_L01", "jordonsommin", "Kaiiess", "Ki_O", "NoamXS", "Athaxe", "OakSeeker950445", "Awesome727", "FishFishy0", "StigmaticPower", "S1mple0_o", "FadedLopo", "CheckYourWater", "just_sh1ne", "KittKattAD", "SLIMEMONSTERR"];
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    const skinUrl = `https://mineskin.eu/body/${randomPlayer}`;
    const downloadUrl = `https://mineskin.eu/download/${randomPlayer}`;

    return new Response(JSON.stringify({ player: randomPlayer, skin: skinUrl }), {
        headers: { "Content-Type": "application/json" }
    });
}
