"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const axios_1 = require("axios");

const translateToEnglish = async (input, options) => {
  const openai = axios_1.default.create({
    baseURL: "https://api.openai.com/v1",
    headers: { Authorization: `Bearer ${options.apikey}` },
  });
  const prompt = "Please translate the following sentences to English:\n\n";
  // send the whole message history to OpenAI
  const { data } = await openai.post("chat/completions", {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: prompt }, 
      { role: "user", content: input.text }
    ],
  });
  const response = data.choices[0].message.content.trim();
  // if holding shift, copy just the response. else, paste the last input and response.
  if (popclip.modifiers.shift) {
    popclip.copyText(response);
  } else {
    popclip.pasteText(response);
  }
  return null;
};
// export the actions
exports.actions = [{
  title: "ChatGPT: Translate to English",
  code: translateToEnglish,
}];
