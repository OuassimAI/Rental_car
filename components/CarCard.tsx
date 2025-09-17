import React from 'react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  onSelectCar: (car: Car) => void;
  isHighlighted: boolean;
}

const CarCard: React.FC<CarCardProps> = ({ car, onSelectCar, isHighlighted }) => {
  const isUnavailable = car.status === 'Maintenance Required';

  return (
    <div 
      id={`car-${car.id}`}
      className={`relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300 group ${isHighlighted ? 'ring-4 ring-blue-500 ring-offset-4 ring-offset-gray-900' : ''} ${isUnavailable ? 'opacity-60' : ''}`}
    >
      {isUnavailable && (
        <div className="absolute top-4 right-[-5px] bg-yellow-500 text-gray-900 text-xs font-bold px-4 py-1 transform rotate-45 translate-x-1/4">
          MAINTENANCE
        </div>
      )}
      <img className="w-full h-56 object-cover" src={car.imageUrl} alt={car.name} />
      <div className="p-6">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-xl font-bold">{car.name}</h3>
                <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded-full">{car.type}</span>
            </div>
            <div className="text-right">
                <p className="text-2xl font-extrabold text-blue-400">${car.pricePerDay}</p>
                <p className="text-gray-400 text-sm">/ day</p>
            </div>
        </div>

        <div className="mt-4 flex justify-around text-center text-gray-300 border-t border-gray-700 pt-4">
            <div className="flex flex-col items-center">
                <span className="font-semibold">{car.features.seats}</span>
                <span className="text-xs text-gray-500">Seats</span>
            </div>
            <div className="flex flex-col items-center">
                 <span className="font-semibold">{car.features.transmission}</span>
                <span className="text-xs text-gray-500">Transmission</span>
            </div>
            <div className="flex flex-col items-center">
                 <span className="font-semibold">{car.features.fuel}</span>
                <span className="text-xs text-gray-500">Fuel</span>
            </div>
        </div>

        <button
          onClick={() => onSelectCar(car)}
          disabled={isUnavailable}
          className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isUnavailable ? 'Unavailable' : 'Rent Now'}
        </button>
      </div>
    </div>
  );
};

export default CarCard;
