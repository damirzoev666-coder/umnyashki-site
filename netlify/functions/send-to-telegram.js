exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: "Bad request" };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const text =
    "🚀 Новая заявка с сайта «Умняшки»:\n" +
    "Имя родителя: " + (data.parentName || "-") + "\n" +
    "Ребёнок: " + (data.childInfo || "-") + "\n" +
    "Телефон: " + (data.phone || "-");

  try {
    const response = await fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: text }),
    });

    if (response.ok) {
      return { statusCode: 500, body: "Telegram error" };
    }

    return { statusCode: 200, body: "OK" };
  } catch (err) {
    return { statusCode: 500, body: "Server error" };
  }
};
