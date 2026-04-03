import React from 'react';

export const QuantXLogo = ({ className = "", size = 32 }: { className?: string, size?: number }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#glow)">
        {/* Core mathematical Q formation incorporating the infinity loop. */}
        {/* Left lobe of infinity acting as the main body of the Q */}
        <path 
          d="M30 65C16.1929 65 5 53.8071 5 40C5 26.1929 16.1929 15 30 15C42 15 48 25 50 35" 
          stroke="currentColor" 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        {/* Right lobe of infinity completing the top and overlapping */}
        <path 
          d="M70 15C83.8071 15 95 26.1929 95 40C95 53.8071 83.8071 65 70 65C58 65 52 55 50 45" 
          stroke="url(#gradient)" 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        {/* Center intersection crossing mechanism representing nexus connectivity */}
        <path
          d="M50 35L70 65"
          stroke="url(#gradient)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M50 45L30 15"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* The Q Tail protruding outward sharply indicating execution */}
        <path 
          d="M60 55L85 85" 
          stroke="url(#gradient)" 
          strokeWidth="8" 
          strokeLinecap="round" 
        />
        
        {/* Mathematical Alpha core dot inside left lobe */}
        <circle cx="28" cy="40" r="4" fill="currentColor" />
        {/* SOTA executing dot inside right lobe */}
        <circle cx="72" cy="40" r="4" fill="#38bdf8" />
      </g>
      <defs>
        <filter id="glow" x="-20" y="-20" width="140" height="140" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="gradient" x1="50" y1="15" x2="95" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" /> {/* sky-400 */}
          <stop offset="1" stopColor="#818cf8" /> {/* indigo-400 */}
        </linearGradient>
      </defs>
    </svg>
  );
};
