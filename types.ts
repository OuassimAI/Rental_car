export interface Car {
  id: number;
  name: string;
  type: 'Sedan' | 'SUV' | 'Sports' | 'Electric' | 'Luxury';
  pricePerDay: number;
  imageUrl: string;
  features: {
    seats: number;
    transmission: 'Automatic' | 'Manual';
    fuel: 'Gasoline' | 'Diesel' | 'Electric';
  };
  status: 'Available' | 'Maintenance Required';
  location: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  carRecommendationId?: number;
}

export interface Booking {
    id: string;
    car: Car;
    startDate: string;
    endDate: string;
    totalCost: number;
}
