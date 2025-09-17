import { GoogleGenAI, Type } from "@google/genai";
import { Car, Booking } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = "gemini-2.5-flash";

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        responseText: {
            type: Type.STRING,
            description: "A friendly, helpful, and conversational response to the user's query. Respond in the user's language."
        },
        action: {
            type: Type.STRING,
            description: "The suggested action. Can be 'recommend_car', 'initiate_booking', 'modify_booking', 'locate_car', or 'answer_question'.",
            enum: ["recommend_car", "initiate_booking", "modify_booking", "locate_car", "answer_question"]
        },
        carId: {
            type: Type.INTEGER,
            description: "The ID of the car if the action is 'recommend_car' or 'initiate_booking'. Otherwise, this can be null."
        },
        bookingDetails: {
            type: Type.OBJECT,
            nullable: true,
            description: "Details for booking modifications, like a new end date.",
            properties: {
                endDate: {
                    type: Type.STRING,
                    description: "The new requested end date in YYYY-MM-DD format."
                }
            }
        }
    }
};


export const getAIResponse = async (chatHistory: string, userQuery: string, cars: Car[], currentBooking: Booking | null) => {
  try {
    const systemInstruction = `You are 'Auto-Mate', an advanced, friendly, and expert AI assistant for 'Prestige Rentals'. 
    Your primary goal is to provide a seamless and helpful experience for users looking to rent a car.
    You must be conversational and respond in the language the user is using.
    
    Your Capabilities:
    1.  **Natural Language Booking**: Understand and process conversational requests like "I need an SUV for a family trip next weekend". Extract details like car type, passenger count, and dates. If crucial information (like dates) is missing, you MUST ask for it.
    2.  **Intelligent Recommendations**: Suggest the best vehicle based on the user's stated needs (e.g., trip purpose, number of people, budget, features).
    3.  **Booking Modifications**: Handle requests to change an existing booking. For now, you can only handle extending the rental period (updating the end date).
    4.  **Fleet Awareness**: You have real-time data on our cars.
        - If a user asks about a car that has a status of 'Maintenance Required', inform them it's unavailable and suggest a similar, available alternative.
        - You can answer questions about a car's current location.
    5.  **Multilingual Support**: You must detect the user's language and respond fluently in that same language.

    Date Information:
    - Today's date is ${new Date().toISOString().split('T')[0]}.

    Current Fleet Status:
    ${JSON.stringify(cars.map(c => ({id: c.id, name: c.name, type: c.type, seats: c.features.seats, pricePerDay: c.pricePerDay, status: c.status, location: c.location})), null, 2)}
    
    Active User Booking:
    ${currentBooking ? JSON.stringify(currentBooking, null, 2) : "No active booking."}
    
    User chat history:
    ${chatHistory}
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: `User query: "${userQuery}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);

    return {
      text: parsedResponse.responseText,
      action: parsedResponse.action,
      carId: parsedResponse.carId,
      bookingDetails: parsedResponse.bookingDetails
    };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
        text: "I'm sorry, I'm having a little trouble connecting right now. Please try again in a moment.",
        action: "answer_question",
        carId: null,
        bookingDetails: null
    };
  }
};
