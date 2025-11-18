import { GoogleGenAI } from "@google/genai";
import { Product, Language } from '../types';

// Initialize Gemini Client
// Note: process.env.API_KEY is injected by the environment
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const askProductAssistant = async (
  product: Product,
  question: string,
  lang: Language
): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key not configured.";
  }

  try {
    const productContext = `
      Product Name: ${product.name[lang]}
      Price: ${product.price}
      Description: ${product.description[lang]}
      Features: ${product.features[lang].join(', ')}
    `;

    const prompt = `
      You are a helpful, futuristic sales assistant for a dropshipping store called "Mercatus Maximus".
      User Language: ${lang} (Reply ONLY in this language).
      
      Product Details:
      ${productContext}

      User Question: "${question}"

      Instructions:
      - Be concise and persuasive.
      - Focus on the benefits of the product features.
      - If the user asks about shipping or returns, mention "standard international shipping" (generic dropshipping safe answer).
      - Keep the tone polite and slightly futuristic/modern.
      - Answer in less than 300 characters if possible.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "I'm having trouble connecting to the neural network. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection interrupted. Please try again later.";
  }
};