
import { GoogleGenAI, Type } from "@google/genai";
import { StoryParams, GeneratedStory } from "./types";

const SYSTEM_INSTRUCTION = `You are MuseAI, an expert Story Generator. 
Your job is to create original, creative, and engaging stories based on the user's input.

Rules:
1. Write in clear, simple, and interesting language.
2. Match the selected genre, tone, and length perfectly.
3. Use strong character development with clear beginning, middle, and ending arcs.
4. Add vivid dialogue where suitable.
5. Build suspense gradually.
6. End with a memorable twist or emotional conclusion.
7. Avoid copying existing intellectual properties.
8. Output the response in a structured JSON format with "title", "content", and an optional "authorNote".

Length Guidelines:
- Short: ~300 words.
- Medium: ~700 words.
- Long: ~1200 words.`;

export const generateStory = async (params: StoryParams): Promise<GeneratedStory> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Generate a ${params.length} story in the ${params.genre} genre.
    Main Character: ${params.characterName}
    Setting: ${params.setting}
    Tone: ${params.tone}
    
    Ensure the story feels immersive and professionally written.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            authorNote: { type: Type.STRING }
          },
          required: ["title", "content"]
        }
      },
    });

    const result = JSON.parse(response.text);
    return result as GeneratedStory;
  } catch (error) {
    console.error("Failed to generate story:", error);
    throw new Error("The muses are silent right now. Please try again in a moment.");
  }
};
