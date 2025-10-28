
import { GoogleGenAI, Modality } from "@google/genai";
import type { Outfit, OutfitStyle } from '../types';
import { OUTFIT_STYLES } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const generateSingleOutfit = async (base64ImageData: string, mimeType: string, style: OutfitStyle): Promise<Outfit> => {
  const model = 'gemini-2.5-flash-image';
  
  const prompt = `You are a world-class virtual stylist. Based on the provided image of a single clothing item, create a complete, stylish ${style.toLowerCase()} outfit. Present the final result as a clean, 'flat-lay' photograph of all the clothing items perfectly arranged on a neutral, light-colored background. The original item must be seamlessly integrated into the new outfit.`;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        {
          inlineData: {
            data: base64ImageData,
            mimeType: mimeType,
          },
        },
        {
          text: prompt,
        },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  const firstPart = response.candidates?.[0]?.content?.parts[0];
  if (firstPart && firstPart.inlineData) {
    const base64ImageBytes: string = firstPart.inlineData.data;
    return {
      style: style,
      imageUrl: `data:image/png;base64,${base64ImageBytes}`,
    };
  } else {
    throw new Error(`Failed to generate image for ${style} style.`);
  }
};

export const generateOutfits = async (base64ImageData: string, mimeType: string): Promise<Outfit[]> => {
  try {
    const outfitPromises = OUTFIT_STYLES.map(style => 
      generateSingleOutfit(base64ImageData, mimeType, style)
    );
    
    const results = await Promise.all(outfitPromises);
    return results;

  } catch (error) {
    console.error("Error generating outfits:", error);
    throw new Error("Could not generate outfits. The AI service may be temporarily unavailable.");
  }
};
