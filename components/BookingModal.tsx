import React, { useState, useEffect } from 'react';
import { Car } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car;
  onConfirm: (bookingDetails: { startDate: string, endDate: string }) => void;
}

const getTodayString = () => new Date().toISOString().split('T')[0];
const getTomorrowString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, car, onConfirm }) => {
  const [startDate, setStartDate] = useState(getTodayString());
  const [endDate, setEndDate] = useState(getTomorrowString());
  const [totalCost, setTotalCost] = useState(car.pricePerDay);
  
  useEffect(() => {
    if (!isOpen) {
      setStartDate(getTodayString());
      setEndDate(getTomorrowString());
    }
  }, [isOpen]);

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start && end && end >= start) {
        const timeDiff = end.getTime() - start.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        setTotalCost(days * car.pricePerDay);
    } else {
        setTotalCost(0);
    }
  }, [startDate, endDate, car.pricePerDay]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (new Date(endDate) < new Date(startDate)) {
      alert("End date cannot be before start date.");
      return;
    }
    onConfirm({ startDate, endDate });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-lg m-4 transform transition-all duration-300 ease-out scale-95 opacity-0 animate-fade-in-scale">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Book Your Ride</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex space-x-6 mb-6">
          <img src={car.imageUrl} alt={car.name} className="w-48 h-32 object-cover rounded-lg" />
          <div>
            <h3 className="text-2xl font-semibold">{car.name}</h3>
            <p className="text-gray-400">{car.type}</p>
            <p className="text-xl font-bold text-blue-400 mt-2">${car.pricePerDay} / day</p>
          </div>
        </div>

        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                    <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    min={getTodayString()}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                 <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
                    <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>
          <div className="flex justify-between items-center bg-gray-900 p-4 rounded-lg">
            <span className="text-lg font-medium text-gray-300">Total Estimated Cost:</span>
            <span className="text-2xl font-extrabold text-blue-400">${totalCost.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button onClick={onClose} className="py-2 px-6 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Cancel</button>
          <button onClick={handleConfirm} className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">Confirm Booking</button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-scale {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in-scale { animation: fade-in-scale 0.2s forwards; }
        /* Style for date picker icon */
        input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
        }
      `}</style>
    </div>
  );
};

export default BookingModal;
