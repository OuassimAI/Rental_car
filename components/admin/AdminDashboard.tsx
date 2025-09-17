import React from 'react';
import { Car, Booking } from '../../types';
import StatCard from './StatCard';
import FleetStatusChart from './FleetStatusChart';
import DemandForecastChart from './DemandForecastChart';
import FleetMapView from './FleetMapView';
import AdminCarList from './AdminCarList';

interface AdminDashboardProps {
  cars: Car[];
  bookings: Booking[];
  onCarStatusChange: (carId: number, newStatus: Car['status']) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ cars, bookings, onCarStatusChange }) => {
  const totalCars = cars.length;
  const availableCars = cars.filter(c => c.status === 'Available').length;
  const maintenanceCars = totalCars - availableCars;
  const activeBookings = bookings.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Cars" value={totalCars} />
        <StatCard title="Available" value={availableCars} />
        <StatCard title="Under Maintenance" value={maintenanceCars} />
        <StatCard title="Active Bookings" value={activeBookings} />
      </div>

      {/* Charts and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Fleet Status</h2>
          <FleetStatusChart available={availableCars} maintenance={maintenanceCars} />
        </div>
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">7-Day Demand Forecast</h2>
          <DemandForecastChart />
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Fleet Management</h2>
          <AdminCarList cars={cars} onStatusChange={onCarStatusChange} />
        </div>
        <div className="xl:col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Live Fleet Location</h2>
          <FleetMapView cars={cars} />
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;