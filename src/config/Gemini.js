import { GoogleGenAI } from "@google/genai";
const KEY = import.meta.env.VITE_GEMINI_API_KEY;

console.log(KEY)

const ai = new GoogleGenAI({
  apiKey: KEY,
});

async function runChat(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  // console.log(response.text);
  return response.text;
}

export default runChat;
