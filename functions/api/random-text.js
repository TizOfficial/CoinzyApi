export async function onRequest() {
  const texts = [
    "Zufall ist nur eine Illusion.",
    "Heute ist ein guter Tag für Coins!",
    "Ich bin nicht faul, ich bin im Energiesparmodus.",
    "Coinzy liebt Kekse.",
    "Wer braucht schon Schlaf, wenn man Coins sammeln kann?",
    "Achte auf die Ente.",
    "System online. Humor aktiviert.",
    "Dein Glücksspruch: Verschwende keinen Spruch!",
    "Nur wer riskiert, gewinnt... manchmal.",
    "404: Motivation nicht gefunden."
  ];

  const random = texts[Math.floor(Math.random() * texts.length)];

  return new Response(JSON.stringify({
    text: random,
    timestamp: new Date().toISOString()
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
