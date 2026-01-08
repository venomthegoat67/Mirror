
import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, ReflectionResult, PersonaType } from "../types";

export const reflectDigitalFootprint = async (input: UserInput): Promise<ReflectionResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const textPrompt = `
    Reflect on the following digital footprint from the perspective of a ${input.persona}.
    
    The user has provided text content and images from their online presence.
    Analyze the visual aesthetic, the language used, and the overall consistency.

    User Context:
    Username: ${input.username || 'Not provided'}
    Bio: ${input.bio}
    Recent Text Posts: ${input.posts.filter(p => p.trim()).join(' | ')}
    Desired Perception: ${input.desiredPerception || 'General'}

    Guidelines:
    - Never be judgmental or absolute.
    - Use words like "may", "might", "could be interpreted as".
    - Act as a neutral mirror, not a critic.
    - Focus on "Perception vs Intent".
    - Provide intelligent, high-quality suggestions for clarity, not rewriting.
    - Explicitly mention visual cues if images were provided.
  `;

  const imageParts = input.images.map(img => ({
    inlineData: {
      data: img.data,
      mimeType: img.mimeType
    }
  }));

  // Using gemini-3-pro-preview for complex analysis involving both text and images
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: {
      parts: [
        { text: textPrompt },
        ...imageParts
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          observedSignals: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Factual, neutral observations from the text and images."
          },
          likelyInterpretation: {
            type: Type.STRING,
            description: "A thoughtful, human-toned paragraph on how this is likely seen."
          },
          possibleMisreadings: {
            type: Type.STRING,
            description: "Potential misunderstandings in a gentle tone."
          },
          whatsMissing: {
            type: Type.STRING,
            description: "Gaps in the perception; things that aren't visible."
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
            }
          },
          smartSuggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "2-3 high-quality suggestions for clarity."
          },
          reflectionQuestion: {
            type: Type.STRING,
            description: "A single final thoughtful question."
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

  // Extract text safely from response.text property
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
