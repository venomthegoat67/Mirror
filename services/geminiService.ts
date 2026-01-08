
import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, ReflectionResult, PersonaType } from "../types";

export const reflectDigitalFootprint = async (input: UserInput): Promise<ReflectionResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are the "Digital Footprint Mirror," a high-end research AI.
    Your task is to reflect a user's digital identity from the specific perspective of a ${input.persona}.
    
    Guidelines:
    - Never be judgmental or absolute.
    - Use words like "may", "might", "could be interpreted as".
    - Act as a neutral, emotionally intelligent mirror, not a critic.
    - Focus on the gap between "Perception vs Intent".
    - Provide intelligent, high-quality suggestions for clarity and positioning, not rewriting content.
    - Analyze visual aesthetic and consistency if images are provided.
    - The output must be a clean, reflective analysis.
  `;

  const userPrompt = `
    Analyze the following digital footprint fragments:

    Username: ${input.username || 'Not provided'}
    Bio: ${input.bio}
    Recent Text Posts: ${input.posts.filter(p => p.trim()).join(' | ')}
    Desired Perception: ${input.desiredPerception || 'General'}

    Reflect on how these signals coalesce into a perceived identity for a ${input.persona}.
  `;

  const imageParts = input.images.map(img => ({
    inlineData: {
      data: img.data,
      mimeType: img.mimeType
    }
  }));

  // Switched to gemini-3-flash-preview to mitigate 'RESOURCE_EXHAUSTED' (429) errors on the Pro model
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { text: userPrompt },
        ...imageParts
      ]
    },
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          observedSignals: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Factual, neutral observations from the text and images provided."
          },
          likelyInterpretation: {
            type: Type.STRING,
            description: "A thoughtful, human-toned paragraph summarizing the likely overall impression."
          },
          possibleMisreadings: {
            type: Type.STRING,
            description: "Potential misunderstandings described in a gentle, non-confrontational tone."
          },
          whatsMissing: {
            type: Type.STRING,
            description: "Aspects of the user's identity that are not apparent from these signals."
          },
          intentVsPerception: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                intent: { type: Type.STRING },
                perception: { type: Type.STRING }
              },
              required: ["intent", "perception"]
            },
            description: "A mapping of specific intents to their likely outward perception."
          },
          smartSuggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "2-3 high-level strategic suggestions for aligning perception with intent."
          },
          reflectionQuestion: {
            type: Type.STRING,
            description: "A single, deep, closing question for the user to ponder."
          }
        },
        required: [
          "observedSignals", 
          "likelyInterpretation", 
          "possibleMisreadings", 
          "whatsMissing", 
          "intentVsPerception", 
          "smartSuggestions", 
          "reflectionQuestion"
        ]
      }
    }
  });

  const resultText = response.text;
  if (!resultText) {
    throw new Error("The mirror returned no reflection.");
  }

  try {
    return JSON.parse(resultText);
  } catch (error) {
    console.error("Failed to parse reflection response", error);
    throw new Error("The mirror is currently clouded. Please try again.");
  }
};
