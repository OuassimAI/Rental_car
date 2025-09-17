import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
};

export default StatCard;