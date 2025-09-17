import React from 'react';

interface FleetStatusChartProps {
  available: number;
  maintenance: number;
}

const FleetStatusChart: React.FC<FleetStatusChartProps> = ({ available, maintenance }) => {
  const total = available + maintenance;
  const availablePercentage = total > 0 ? (available / total) * 100 : 0;
  const maintenancePercentage = 100 - availablePercentage;

  const circumference = 2 * Math.PI * 45;
  const availableStroke = (availablePercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="transparent" stroke="#4a5568" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            stroke="#4299e1"
            strokeWidth="10"
            strokeDasharray={`${availableStroke} ${circumference}`}
            transform="rotate(-90 50 50)"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{total}</span>
            <span className="text-sm text-gray-400">Total</span>
        </div>
      </div>
      <div className="flex justify-center space-x-6 mt-4 text-sm w-full">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
          <span>Available: {available}</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-gray-600 rounded-full mr-2"></span>
          <span>Maintenance: {maintenance}</span>
        </div>
      </div>
    </div>
  );
};

export default FleetStatusChart;