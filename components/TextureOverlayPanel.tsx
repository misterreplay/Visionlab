
import React from 'react';
import type { TextureSettings, Preset } from '../types';
import { TEXTURE_PRESETS } from '../constants';
import SliderControl from './SliderControl';
import PresetCard from './PresetCard';

interface TextureOverlayPanelProps {
  settings: TextureSettings;
  setSettings: React.Dispatch<React.SetStateAction<TextureSettings>>;
  onPresetSelect: (preset: Preset) => void;
}

const TextureOverlayPanel: React.FC<TextureOverlayPanelProps> = ({ settings, setSettings, onPresetSelect }) => {
  const handleSliderChange = (key: keyof TextureSettings) => (value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-100">Texture Overlay</h2>
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-2">Texture Presets</h3>
        <div className="grid grid-cols-2 gap-4">
          {TEXTURE_PRESETS.map(preset => (
            <PresetCard
              key={preset.name}
              preset={preset}
              isSelected={settings.preset.name === preset.name}
              onClick={() => onPresetSelect(preset)}
            />
          ))}
        </div>
      </div>
      <div className="space-y-2 pt-2">
        <SliderControl label="Grain Intensity" value={settings.grainIntensity} onChange={handleSliderChange('grainIntensity')} />
        <SliderControl label="Grain Size" value={settings.grainSize} onChange={handleSliderChange('grainSize')} />
        <SliderControl label="Flicker" value={settings.flicker} onChange={handleSliderChange('flicker')} />
        <SliderControl label="Scratches & Dust" value={settings.scratchesAndDust} onChange={handleSliderChange('scratchesAndDust')} />
        <SliderControl label="Texture Opacity" value={settings.textureOpacity} onChange={handleSliderChange('textureOpacity')} />
      </div>
    </div>
  );
};

export default TextureOverlayPanel;
