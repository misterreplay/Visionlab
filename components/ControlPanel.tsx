
import React from 'react';
import type { TextureSettings, ColorSettings, Preset } from '../types';
import TextureOverlayPanel from './TextureOverlayPanel';
import ColorGradingPanel from './ColorGradingPanel';

interface ControlPanelProps {
  textureSettings: TextureSettings;
  setTextureSettings: React.Dispatch<React.SetStateAction<TextureSettings>>;
  colorSettings: ColorSettings;
  setColorSettings: React.Dispatch<React.SetStateAction<ColorSettings>>;
  onTexturePresetSelect: (preset: Preset) => void;
  onLutPresetSelect: (preset: Preset) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = (props) => {
  return (
    <div className="p-4 space-y-6">
      <TextureOverlayPanel 
        settings={props.textureSettings}
        setSettings={props.setTextureSettings}
        onPresetSelect={props.onTexturePresetSelect}
      />
      <ColorGradingPanel 
        settings={props.colorSettings}
        setSettings={props.setColorSettings}
        onPresetSelect={props.onLutPresetSelect}
      />
    </div>
  );
};

export default ControlPanel;
