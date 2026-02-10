const axios = require("axios");

async function askAI(question) {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{
        parts: [{ text: `Answer the following question with exactly ONE word only${question}` }]
      }]
    }
  );

  return response.data.candidates[0].content.parts[0].text
    .trim()
    .split(/\s+/)[0];
}

module.exports = { askAI };
