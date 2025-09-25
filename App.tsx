import React, { useState } from 'react';
import type { TextureSettings, ColorSettings, Preset } from './types';
import { TEXTURE_PRESETS, LUT_PRESETS } from './constants';
import Header from './components/Header';
import MediaPreview from './components/MediaPreview';
import ControlPanel from './components/ControlPanel';

const App: React.FC = () => {
  const [mediaFile, setMediaFile] = useState<{ url: string; type: 'image' | 'video' } | null>(null);
  
  const [textureSettings, setTextureSettings] = useState<TextureSettings>({
    preset: TEXTURE_PRESETS[0],
    grainIntensity: 45,
    grainSize: 25,
    flicker: 15,
    scratchesAndDust: 20,
    textureOpacity: 60,
  });

  const [colorSettings, setColorSettings] = useState<ColorSettings>({
    midtones: { intensity: 50, color: { x: 0, y: 0 } },
    shadows: { intensity: 35, color: { x: 0, y: 0 } },
    highlights: { intensity: 65, color: { x: 0, y: 0 } },
    offset: { intensity: 50, color: { x: 0, y: 0 } },
    whiteBalance: 15,
    exposure: 25,
    contrast: 35,
    saturation: 20,
    tint: -10,
    vignette: 25,
    lutPreset: LUT_PRESETS[0],
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Clean up previous object URL to avoid memory leaks
      if (mediaFile?.url) {
        URL.revokeObjectURL(mediaFile.url);
      }
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith('video/') ? 'video' : 'image';
      setMediaFile({ url, type });
    }
  };

  const handleTexturePresetSelect = (preset: Preset) => {
    setTextureSettings(prev => ({ ...prev, preset }));
  };

  const handleLutPresetSelect = (preset: Preset) => {
    setColorSettings(prev => ({ ...prev, lutPreset: preset }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <Header onFileChange={handleFileChange} />
      <main className="flex-grow flex flex-col lg:flex-row p-4 gap-4">
        <div className="flex-grow lg:w-2/3 flex items-center justify-center bg-black rounded-lg overflow-hidden">
          <MediaPreview
            mediaFile={mediaFile}
            onFileChange={handleFileChange}
            textureSettings={textureSettings}
            colorSettings={colorSettings}
          />
        </div>
        <div className="lg:w-1/3 bg-gray-800 rounded-lg p-1 overflow-y-auto max-h-[85vh]">
          <ControlPanel
            textureSettings={textureSettings}
            setTextureSettings={setTextureSettings}
            colorSettings={colorSettings}
            setColorSettings={setColorSettings}
            onTexturePresetSelect={handleTexturePresetSelect}
            onLutPresetSelect={handleLutPresetSelect}
          />
        </div>
      </main>
    </div>
  );
};

export default App;