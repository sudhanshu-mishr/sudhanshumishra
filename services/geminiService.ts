
import { GoogleGenAI } from "@google/genai";
import '../types';

/**
 * Sends a message history to the Gemini model and returns the response text.
 * Instantiates the client right before the call to ensure the latest process.env.API_KEY is used.
 */
export const chatWithNexus = async (history: { role: 'user' | 'model'; parts: { text: string }[] }[]) => {
  // Use a fallback for process.env during build if needed, though types.ts should cover it.
  const apiKey = (process.env as any).API_KEY;
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: history,
      config: {
        systemInstruction: `You are the "Synthesis Node", the AI representative for Sudhanshu Mishra, a B.Tech ECE (VLSI) student and engineer-entrepreneur.
        Sudhanshu's contact email is msudhanshu416@gmail.com and his Instagram is @sudhanshu_mishra107.
        He is an expert in VLSI, AI architectures, and Full-Stack development.
        He is an active freelancer on Fiverr and Upwork, delivering high-performance digital solutions.
        Your tone is sophisticated, technical, and futuristic.
        Focus on his engineering precision and projects like Aura Smart Pen.
        Limit responses to 2 sentences maximum.
        Use terminology related to "silicon", "logic gates", "embedded systems", and "synthesis".`,
        temperature: 0.7,
      }
    });

    return response.text || "Synchronicity error. Re-establishing link...";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    
    // Check for "entity not found" which often signals an invalid/expired key
    if (error?.message?.includes("Requested entity was not found")) {
      return "Critical: Authorization token rejected by neural host. Please reset authorization in the HUD.";
    }
    
    return "Error: Hardware sub-routine offline. Check network integrity.";
  }
};
