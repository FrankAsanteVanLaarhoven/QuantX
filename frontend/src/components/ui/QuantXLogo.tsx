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
      {/* Outer glow filter specifically matching the reference image's ethereal white light */}
      <filter id="whiteGlow" x="-20" y="-20" width="140" height="140" filterUnits="userSpaceOnUse">
        <feGaussianBlur stdDeviation="3" result="blur1" />
        <feGaussianBlur stdDeviation="6" result="blur2" />
        <feMerge>
          <feMergeNode in="blur2" />
          <feMergeNode in="blur1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <g filter="url(#whiteGlow)">
        {/*
          The exact "Broken Infinity" path from the user's image.
          Starts midway through the bottom-left curve, goes up through the center crossing,
          loops the right lobe entirely, crosses down through the center,
          loops the top-left lobe, and stops at the bottom-left creating the signature gap.
        */}
        <path 
          d="M 28 68
             C 45 68, 55 32, 72 32
             C 90 32, 90 68, 72 68
             C 55 68, 45 32, 28 32
             C 10 32, 10 68, 22 68"
          stroke="currentColor" 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
      </g>
    </svg>
  );
};
