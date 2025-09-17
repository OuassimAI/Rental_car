import React from 'react';
import { Car } from '../../types';

interface AdminCarListProps {
  cars: Car[];
  onStatusChange: (carId: number, newStatus: Car['status']) => void;
}

const AdminCarList: React.FC<AdminCarListProps> = ({ cars, onStatusChange }) => {

  const handleToggle = (car: Car) => {
    const newStatus = car.status === 'Available' ? 'Maintenance Required' : 'Available';
    onStatusChange(car.id, newStatus);
  };

  return (
    <div className="overflow-x-auto max-h-[450px]">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs text-gray-300 uppercase bg-gray-700/50 sticky top-0">
          <tr>
            <th scope="col" className="px-6 py-3">
              Car Name
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Price/Day
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50">
              <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                {car.name}
              </th>
              <td className="px-6 py-4">{car.type}</td>
              <td className="px-6 py-4">${car.pricePerDay}</td>
              <td className="px-6 py-4">{car.location}</td>
              <td className="px-6 py-4 flex justify-center items-center">
                <label htmlFor={`toggle-${car.id}`} className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      id={`toggle-${car.id}`} 
                      className="sr-only" 
                      checked={car.status === 'Available'}
                      onChange={() => handleToggle(car)}
                    />
                    <div className={`block w-14 h-8 rounded-full transition ${car.status === 'Available' ? 'bg-blue-600' : 'bg-gray-600'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${car.status === 'Available' ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCarList;