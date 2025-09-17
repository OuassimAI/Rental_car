import React from 'react';
import { Car } from '../../types';

// Simple hashing function to get consistent coordinates from location string
const getLocationCoords = (location: string, mapWidth: number, mapHeight: number) => {
    let hash = 0;
    for (let i = 0; i < location.length; i++) {
        const char = location.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; 
    }
    const x = Math.abs(hash) % (mapWidth - 20) + 10;
    
    // Use a different hashing for y to spread points
    let hash2 = 0;
    for (let i = location.length -1; i >= 0; i--) {
        const char = location.charCodeAt(i);
        hash2 = ((hash2 << 5) - hash2) + char;
        hash2 |= 0;
    }
    const y = Math.abs(hash2) % (mapHeight - 20) + 10;

    return { x, y };
}


const FleetMapView: React.FC<{ cars: Car[] }> = ({ cars }) => {
    const MAP_WIDTH = 400;
    const MAP_HEIGHT = 450;

  return (
    <div 
        className="relative w-full h-full bg-gray-700/50 rounded-lg overflow-hidden border border-gray-600"
        style={{height: `${MAP_HEIGHT}px`}}
    >
       <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
       {cars.map(car => {
           const { x, y } = getLocationCoords(car.location, MAP_WIDTH, document.querySelector('.xl\\:col-span-1')?.clientWidth || MAP_WIDTH);
           const isMaintenance = car.status === 'Maintenance Required';

           return (
               <div 
                key={car.id} 
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${x}px`, top: `${y}px` }}
               >
                   <span 
                    className={`block w-3 h-3 rounded-full ${isMaintenance ? 'bg-yellow-500' : 'bg-blue-500'} transition-transform duration-200 group-hover:scale-150`}
                   ></span>
                   <div className="absolute bottom-full mb-2 w-max bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                       {car.name}
                       <p className="text-gray-400 text-xs">{car.location}</p>
                   </div>
               </div>
           )
       })}
       <style>{`
        .bg-grid-pattern {
            background-image: linear-gradient(to right, #556073 1px, transparent 1px), linear-gradient(to bottom, #556073 1px, transparent 1px);
            background-size: 20px 20px;
        }
       `}</style>
    </div>
  );
};

export default FleetMapView;