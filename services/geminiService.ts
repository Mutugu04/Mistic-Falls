import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

const SYSTEM_INSTRUCTION = `
You are "Mistic AI", the specialized event concierge for "Mistic Falls", the premier event centre located at 5 Sultan Road, Nassarawa, Kano, Nigeria.
Your tone is warm, welcoming, professional, and slightly celebratory (Hausa hospitality).

Key Venue Details:
- Location: 5 Sultan Road, Nassarawa, Kano.
- Best for: Weddings, Parties, Corporate Receptions, Bridal Showers.
- Vibe: Luxurious, Colorful, Exciting.

Your Goal:
1. Answer questions about venue capacity (up to 1000), location, and vibe.
2. Suggest decor ideas based on themes (e.g., "Royal Gold", "Traditional Hausa", "Modern Chic").
3. Help with budgeting. If a user asks for a budget breakdown, return a JSON string block inside the text marked with \`\`\`json\`\`\` that contains a list of items and costs totaling their budget.
4. Draft short speeches or invitation texts if asked.

Do not make up pricing that isn't roughly consistent with high-end Kano venues (e.g., in Millions of Naira for big weddings).
If you don't know something specific (like today's exact availability), ask them to use the "Book Now" form to check with the manager.
`;

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return aiClient;
};

export const chatWithConcierge = async (
  message: string,
  history: ChatMessage[]
): Promise<ChatMessage> => {
  try {
    const ai = getClient();
    
    // Convert history to format expected by API if using chat session, 
    // but here we will just do a single turn for simplicity or use generateContent with history context concatenated if needed.
    // For a robust chat, we usually use ai.chats.create, but we'll stick to generateContent for statelesness or simple history injection.
    
    const chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    // Replay history (simplified)
    // In a real app, we would persist the chat session object, but here we just send the new message 
    // usually assuming the UI handles the context or we restart. 
    // To keep it simple and stateless for this demo, we will just send the user message to a fresh session 
    // or you can implement full history re-injection.
    // For this specific demo, let's just send the message.
    
    const result: GenerateContentResponse = await chatSession.sendMessage({
      message: message
    });
    
    const responseText = result.text || "I'm having trouble connecting to the event server. Please try again.";

    // Check for JSON budget data
    let budgetData: { name: string; value: number }[] | undefined = undefined;
    let isBudget = false;

    const jsonMatch = responseText.match(/```json([\s\S]*?)```/);
    if (jsonMatch && jsonMatch[1]) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        if (Array.isArray(parsed)) {
            budgetData = parsed;
            isBudget = true;
        }
      } catch (e) {
        console.error("Failed to parse budget JSON", e);
      }
    }

    // Clean the text if JSON was found to avoid showing raw code to user
    const cleanText = responseText.replace(/```json[\s\S]*?```/, '').trim();

    return {
      role: 'model',
      text: cleanText,
      isBudget,
      budgetData
    };

  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      role: 'model',
      text: "I apologize, but I'm currently overwhelmed with inquiries. Please contact our front desk at 5 Sultan Road directly!"
    };
  }
};
