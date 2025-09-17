import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Car, ChatMessage, Booking } from '../types';
import { getAIResponse } from '../services/geminiService';

interface AIChatProps {
  cars: Car[];
  onSelectCar: (car: Car) => void;
  onHighlightCar: (carId: number) => void;
  currentBooking: Booking | null;
  onUpdateBooking: (booking: Booking) => void;
  isOpen: boolean;
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ cars, onSelectCar, onHighlightCar, currentBooking, onUpdateBooking, isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);
  
  const initializeChat = useCallback(() => {
    if (messages.length === 0) {
        setIsLoading(true);
        setTimeout(() => {
            setMessages([{
                id: 'init',
                sender: 'ai',
                text: "Hello! I'm Auto-Mate. How can I help you today? Feel free to ask 'what SUVs do you have?' or 'I need a car for a week'."
            }]);
            setIsLoading(false);
        }, 500);
    }
  }, [messages.length]);


  useEffect(() => {
    if(isOpen) {
      initializeChat();
    }
  }, [isOpen, initializeChat]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userInput,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);
    
    const chatHistory = messages.map(m => `${m.sender}: ${m.text}`).join('\n');
    const aiResponse = await getAIResponse(chatHistory, userInput, cars, currentBooking);

    const newAiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: aiResponse.text,
      carRecommendationId: aiResponse.carId ?? undefined,
    };

    setMessages((prev) => [...prev, newAiMessage]);
    setIsLoading(false);

    // Handle actions from AI
    switch (aiResponse.action) {
        case 'recommend_car':
            if (aiResponse.carId) onHighlightCar(aiResponse.carId);
            break;
        case 'initiate_booking':
            const carToBook = cars.find(c => c.id === aiResponse.carId);
            if (carToBook) {
                onSelectCar(carToBook);
                onClose();
            }
            break;
        case 'modify_booking':
            if (currentBooking && aiResponse.bookingDetails?.endDate) {
                const newEndDate = aiResponse.bookingDetails.endDate;
                const startDate = new Date(currentBooking.startDate);
                const endDate = new Date(newEndDate);
                const timeDiff = endDate.getTime() - startDate.getTime();
                const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
                const totalCost = days * currentBooking.car.pricePerDay;

                onUpdateBooking({
                    ...currentBooking,
                    endDate: newEndDate,
                    totalCost: totalCost,
                });
            }
            break;
        default:
            // For locate_car and answer_question, just displaying the text is enough.
            break;
    }
  };

  const handleBookRecommendation = (carId: number) => {
    const carToBook = cars.find(c => c.id === carId);
    if(carToBook) {
        onSelectCar(carToBook);
        onClose();
    }
  }

  return (
    <>
      <div className={`fixed bottom-8 right-8 z-50 w-full max-w-md h-[70vh] max-h-[600px] flex flex-col bg-gray-800 shadow-2xl rounded-xl border border-gray-700 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <header className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900 rounded-t-xl">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            Auto-Mate Assistant
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </header>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-lg' : 'bg-gray-700 text-gray-200 rounded-bl-lg'}`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                   {msg.sender === 'ai' && msg.carRecommendationId && (
                     <button 
                        onClick={() => handleBookRecommendation(msg.carRecommendationId as number)}
                        className="mt-2 text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-full transition-colors"
                     >
                        Book Now
                     </button>
                   )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                  <div className="px-4 py-2 rounded-2xl bg-gray-700 text-gray-200 rounded-bl-lg">
                      <div className="flex items-center space-x-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                      </div>
                  </div>
              </div>
            )}
          </div>
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
          <div className="relative">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask for a car..."
              className="w-full bg-gray-700 border border-gray-600 rounded-full py-3 pl-4 pr-12 text-white focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-blue-400 hover:text-blue-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AIChat;