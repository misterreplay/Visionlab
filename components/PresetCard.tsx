
import React from 'react';
import type { Preset } from '../types';

interface PresetCardProps {
  preset: Preset;
  isSelected: boolean;
  onClick: () => void;
}

const PresetCard: React.FC<PresetCardProps> = ({ preset, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer group space-y-2 transition-all duration-200 ${isSelected ? 'transform scale-105' : 'hover:transform hover:scale-105'}`}
    >
      <div
        className={`relative rounded-lg overflow-hidden border-2 transition-colors ${isSelected ? 'border-blue-500' : 'border-transparent group-hover:border-blue-400'}`}
      >
        <img src={preset.imageUrl} alt={preset.name} className="w-full h-24 object-cover" />
         <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-0 transition-opacity"></div>
      </div>
      <p className={`text-center text-sm transition-colors ${isSelected ? 'text-blue-400 font-semibold' : 'text-gray-400 group-hover:text-white'}`}>
        {preset.name}
      </p>
    </div>
  );
};

export default PresetCard;
