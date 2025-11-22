import { GoogleGenAI } from "@google/genai";
import { GEMINI_SYSTEM_INSTRUCTION } from "../constants";

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      client = new GoogleGenAI({ apiKey });
    } else {
      console.warn("Gemini API Key is missing. AI features will be disabled.");
    }
  }
  return client;
};

export const generateSupportResponse = async (
  history: { role: 'user' | 'model'; text: string }[],
  lastMessage: string
): Promise<string> => {
  const ai = getClient();
  if (!ai) return "I'm sorry, but my AI connection is currently unavailable. Please check your API configuration.";

  try {
    // We reconstruct a chat history for context
    // Note: In a production app, we would use ai.chats.create() and maintain the session object.
    // Here, for simplicity in a stateless-like functional call, we use generateContent with the last message 
    // or a simple concatenation if we wanted full history in one go. 
    // However, to do it properly with the SDK's chat interface:
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: lastMessage });
    return result.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error while processing your request. Please try again later.";
  }
};
