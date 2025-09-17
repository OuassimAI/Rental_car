import React from 'react';

const DemandForecastChart: React.FC = () => {
  // Mock data for the next 7 days
  const forecastData = [
    { day: 'Mon', demand: 65 },
    { day: 'Tue', demand: 70 },
    { day: 'Wed', demand: 75 },
    { day: 'Thu', demand: 85 },
    { day: 'Fri', demand: 95 },
    { day: 'Sat', demand: 100 },
    { day: 'Sun', demand: 90 },
  ];

  const SVG_WIDTH = 500;
  const SVG_HEIGHT = 200;
  const PADDING = 30;

  const points = forecastData.map((point, i) => {
    const x = PADDING + (i / (forecastData.length - 1)) * (SVG_WIDTH - 2 * PADDING);
    const y = SVG_HEIGHT - PADDING - (point.demand / 110) * (SVG_HEIGHT - 2 * PADDING); // Max demand a bit higher
    return `${x},${y}`;
  }).join(' ');
  
  const areaPoints = `${PADDING},${SVG_HEIGHT - PADDING} ${points} ${SVG_WIDTH-PADDING},${SVG_HEIGHT - PADDING}`;

  return (
    <div className="w-full h-full flex items-center justify-center">
        <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full h-auto">
            {/* Y-Axis labels */}
            <text x="5" y={PADDING - 5} fontSize="10" fill="#a0aec0">100</text>
            <text x="5" y={SVG_HEIGHT - PADDING + 5} fontSize="10" fill="#a0aec0">0</text>
            
            {/* Gradient */}
            <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: "rgba(66, 153, 225, 0.4)"}} />
                    <stop offset="100%" style={{stopColor: "rgba(66, 153, 225, 0)"}} />
                </linearGradient>
            </defs>

            {/* Area */}
            <polygon points={areaPoints} fill="url(#areaGradient)" />

            {/* Line */}
            <polyline
                fill="none"
                stroke="#4299e1"
                strokeWidth="2"
                points={points}
            />

            {/* Points and X-Axis labels */}
            {forecastData.map((point, i) => {
                const x = PADDING + (i / (forecastData.length - 1)) * (SVG_WIDTH - 2 * PADDING);
                const y = SVG_HEIGHT - PADDING - (point.demand / 110) * (SVG_HEIGHT - 2 * PADDING);
                return (
                    <g key={point.day}>
                        <circle cx={x} cy={y} r="3" fill="#4299e1" />
                        <text x={x} y={SVG_HEIGHT - 10} fontSize="12" fill="#a0aec0" textAnchor="middle">
                            {point.day}
                        </text>
                    </g>
                );
            })}
        </svg>
    </div>
  );
};

export default DemandForecastChart;