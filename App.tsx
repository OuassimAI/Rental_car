import React, { useState, useMemo } from 'react';
import { Car, Booking } from './types';
import { CARS } from './constants';
import Header from './components/Header';
import CarList from './components/CarList';
import BookingModal from './components/BookingModal';
import AIChat from './components/AIChat';
import AdminDashboard from './components/admin/AdminDashboard';
import Services from './components/Services';

export default function App() {
  const [cars, setCars] = useState<Car[]>(CARS);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [highlightedCarId, setHighlightedCarId] = useState<number | null>(null);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [view, setView] = useState<'customer' | 'admin'>('customer');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSelectCar = (car: Car) => {
    if (car.status === 'Maintenance Required') {
      alert("This car is currently unavailable due to maintenance. Please select another vehicle.");
      return;
    }
    setSelectedCar(car);
    setIsBookingModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
    setSelectedCar(null);
  };

  const handleBookingConfirm = (bookingDetails: { startDate: string; endDate: string }) => {
    if (!selectedCar) return;

    const startDate = new Date(bookingDetails.startDate);
    const endDate = new Date(bookingDetails.endDate);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    const totalCost = days * selectedCar.pricePerDay;

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      car: selectedCar,
      ...bookingDetails,
      totalCost,
    }
    setCurrentBooking(newBooking);
    alert(`Booking confirmed for ${selectedCar.name} from ${bookingDetails.startDate} to ${bookingDetails.endDate}!`);
    handleCloseModal();
  };
  
  const handleCarStatusChange = (carId: number, newStatus: Car['status']) => {
    setCars(prevCars => 
      prevCars.map(car => 
        car.id === carId ? { ...car, status: newStatus } : car
      )
    );
  };

  const handleUpdateBooking = (updatedBooking: Booking) => {
    setCurrentBooking(updatedBooking);
  };

  const handleAiHighlightCar = (carId: number) => {
    setHighlightedCarId(carId);
    const carElement = document.getElementById(`car-${carId}`);
    if (carElement) {
      carElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => setHighlightedCarId(null), 4000); // Highlight for 4 seconds
  };

  const carList = useMemo(() => cars, [cars]);

  return (
    <div className="min-h-screen bg-gray-900 text-white selection:bg-blue-500 selection:text-white">
      <Header 
        currentView={view}
        onToggleView={() => setView(v => v === 'customer' ? 'admin' : 'customer')}
        onOpenChat={() => setIsChatOpen(true)}
      />
      {view === 'customer' ? (
        <>
          <main className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Find Your Perfect Ride</h1>
              <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                Explore our premium collection of vehicles. Need help? Our AI assistant is here to guide you to your dream car.
              </p>
            </div>
            
            {currentBooking && (
              <div className="bg-gray-800 border border-blue-500 rounded-lg p-6 mb-12 max-w-4xl mx-auto shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">Your Current Booking</h2>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <img src={currentBooking.car.imageUrl} alt={currentBooking.car.name} className="w-full md:w-1/3 h-auto object-cover rounded-md" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{currentBooking.car.name}</h3>
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                      <div>
                        <p className="text-gray-400">Start Date</p>
                        <p className="font-semibold">{currentBooking.startDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">End Date</p>
                        <p className="font-semibold">{currentBooking.endDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Total Cost</p>
                        <p className="font-semibold">${currentBooking.totalCost.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Booking ID</p>
                        <p className="font-mono text-xs">{currentBooking.id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Services />

            <div id="fleet">
              <CarList 
                cars={carList} 
                onSelectCar={handleSelectCar} 
                highlightedCarId={highlightedCarId}
              />
            </div>
          </main>
          
          {selectedCar && (
            <BookingModal
              isOpen={isBookingModalOpen}
              onClose={handleCloseModal}
              car={selectedCar}
              onConfirm={handleBookingConfirm}
            />
          )}

          <AIChat 
            cars={cars} 
            onSelectCar={handleSelectCar}
            onHighlightCar={handleAiHighlightCar}
            currentBooking={currentBooking}
            onUpdateBooking={handleUpdateBooking}
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
          />

          <div className={`fixed bottom-8 right-8 z-50 transition-transform duration-300 ${isChatOpen ? 'scale-0' : 'scale-100'}`}>
            <button
              onClick={() => setIsChatOpen(true)}
              className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
              aria-label="Open AI Chat"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </button>
          </div>
        </>
      ) : (
        <AdminDashboard 
          cars={cars}
          bookings={currentBooking ? [currentBooking] : []}
          onCarStatusChange={handleCarStatusChange}
        />
      )}
    </div>
  );
}