import React from 'react';
import type { ColorSettings, Preset, ColorWheelValue } from '../types';
import { LUT_PRESETS } from '../constants';
import SliderControl from './SliderControl';
import PresetCard from './PresetCard';
import ColorWheel from './ColorWheel';

interface ColorGradingPanelProps {
  settings: ColorSettings;
  setSettings: React.Dispatch<React.SetStateAction<ColorSettings>>;
  onPresetSelect: (preset: Preset) => void;
}

const ColorGradingPanel: React.FC<ColorGradingPanelProps> = ({ settings, setSettings, onPresetSelect }) => {
  const handleSliderChange = (key: keyof ColorSettings) => (value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleWheelChange = (wheel: 'midtones' | 'shadows' | 'highlights' | 'offset') => (value: ColorWheelValue) => {
    setSettings(prev => ({ ...prev, [wheel]: value }));
  };

  return (
    <div className="space-y-4 pt-4 border-t border-gray-700">
      <h2 className="text-xl font-semibold text-gray-100">Color Grading</h2>
      
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-3">Color Wheels</h3>
        <div className="grid grid-cols-2 gap-4 items-center justify-items-center">
            <ColorWheel label="Shadows" value={settings.shadows} onChange={handleWheelChange('shadows')} />
            <ColorWheel label="Midtones" value={settings.midtones} onChange={handleWheelChange('midtones')} />
            <ColorWheel label="Highlights" value={settings.highlights} onChange={handleWheelChange('highlights')} />
            <ColorWheel label="Offset" value={settings.offset} onChange={handleWheelChange('offset')} />
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <SliderControl label="White Balance" value={settings.whiteBalance} min={-100} max={100} onChange={handleSliderChange('whiteBalance')} />
        <SliderControl label="Exposure" value={settings.exposure} min={-100} max={100} onChange={handleSliderChange('exposure')} />
        <SliderControl label="Contrast" value={settings.contrast} min={-100} max={100} onChange={handleSliderChange('contrast')} />
        <SliderControl label="Saturation" value={settings.saturation} min={-100} max={100} onChange={handleSliderChange('saturation')} />
        <SliderControl label="Tint" value={settings.tint} min={-100} max={100} onChange={handleSliderChange('tint')} />
        <SliderControl label="Vignette" value={settings.vignette} min={0} max={100} onChange={handleSliderChange('vignette')} />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-2">LUT 프리셋</h3>
        <div className="grid grid-cols-2 gap-4">
          {LUT_PRESETS.map(preset => (
            <PresetCard
              key={preset.name}
              preset={preset}
              isSelected={settings.lutPreset.name === preset.name}
              onClick={() => onPresetSelect(preset)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorGradingPanel;