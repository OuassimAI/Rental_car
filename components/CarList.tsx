
import React from 'react';
import { Car } from '../types';
import CarCard from './CarCard';

interface CarListProps {
  cars: Car[];
  onSelectCar: (car: Car) => void;
  highlightedCarId: number | null;
}

const CarList: React.FC<CarListProps> = ({ cars, onSelectCar, highlightedCarId }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {cars.map((car) => (
        <CarCard 
          key={car.id} 
          car={car} 
          onSelectCar={onSelectCar}
          isHighlighted={highlightedCarId === car.id}
        />
      ))}
    </div>
  );
};

export default CarList;
