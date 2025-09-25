import React, { useRef, useEffect } from 'react';
import type { ColorWheelValue } from '../types';

interface ColorWheelProps {
  label: 'Midtones' | 'Shadows' | 'Highlights' | 'Offset';
  value: ColorWheelValue;
  onChange: (value: ColorWheelValue) => void;
}

const WHEEL_SIZE = 120; // in pixels

const ColorWheel: React.FC<ColorWheelProps> = ({ label, value, onChange }) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleInteraction = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!wheelRef.current) return;
    
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    let dx = clientX - centerX;
    let dy = clientY - centerY;
    const radius = rect.width / 2;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > radius) {
      dx = (dx / dist) * radius;
      dy = (dy / dist) * radius;
    }

    const newColor = {
      x: dx / radius,
      y: dy / radius,
    };

    onChange({ ...value, color: newColor });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    handleInteraction(e);
  };
  
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDragging.current = true;
    handleInteraction(e);
  };

  const handleReset = () => {
    onChange({ ...value, color: { x: 0, y: 0 } });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      handleInteraction(e as unknown as React.MouseEvent<HTMLDivElement>);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging.current) return;
        handleInteraction(e as unknown as React.TouchEvent<HTMLDivElement>);
    }

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [value, onChange]);


  const puckX = value.color.x * (WHEEL_SIZE / 2);
  const puckY = value.color.y * (WHEEL_SIZE / 2);

  return (
    <div className="flex flex-col items-center space-y-2 select-none">
        <div className="flex items-center justify-between w-full px-2">
            <p className="text-sm text-gray-300 font-medium">{label}</p>
            <button onClick={handleReset} title={`Reset ${label}`} className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l16 16" />
                </svg>
            </button>
        </div>
        <div
            ref={wheelRef}
            className="relative cursor-pointer"
            style={{ width: `${WHEEL_SIZE}px`, height: `${WHEEL_SIZE}px` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: 'conic-gradient(from 180deg at 50% 50%, #f00 0deg, #ff0 60deg, #0f0 120deg, #0ff 180deg, #00f 240deg, #f0f 300deg, #f00 360deg)',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
              }}
            />
            {/* Crosshairs */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-900 opacity-50 -translate-y-1/2"></div>
            <div className="absolute left-1/2 top-0 h-full w-px bg-gray-900 opacity-50 -translate-x-1/2"></div>
            
            {/* Puck */}
            <div
                className="absolute top-1/2 left-1/2 w-4 h-4 border-2 border-white rounded-full bg-gray-800 bg-opacity-50 pointer-events-none"
                style={{
                    transform: `translate(-50%, -50%) translate(${puckX}px, ${puckY}px)`,
                }}
            ></div>
      </div>
    </div>
  );
};

export default ColorWheel;
