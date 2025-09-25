
import React from 'react';

interface SliderControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const SliderControl: React.FC<SliderControlProps> = ({ label, value, onChange, min = 0, max = 100, step = 1 }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = e.target.value === '' ? min : Number(e.target.value);
    onChange(Math.max(min, Math.min(max, numValue)));
  };

  return (
    <div className="flex items-center space-x-4">
      <label className="w-32 text-sm text-gray-300 truncate">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleInputChange}
        className="flex-grow h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
      />
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          className="w-16 bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 text-center"
        />
      </div>
    </div>
  );
};

export default SliderControl;
