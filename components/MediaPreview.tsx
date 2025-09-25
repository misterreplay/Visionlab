import React, from 'react';
import type { TextureSettings, ColorSettings, ColorWheelValue } from '../types';

interface MediaPreviewProps {
  mediaFile: { url: string; type: 'image' | 'video' } | null;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  textureSettings: TextureSettings;
  colorSettings: ColorSettings;
}

const getColorWheelStyle = (value: ColorWheelValue, blendMode: string): React.CSSProperties => {
    const { color, intensity } = value;
    const radius = Math.min(1, Math.sqrt(color.x ** 2 + color.y ** 2));

    if (radius === 0) {
        return { display: 'none' };
    }

    const angle = Math.atan2(color.y, color.x);
    // The conic-gradient in ColorWheel.tsx starts with red at the left (180 degrees).
    // The standard atan2 calculation has red at the right (0 degrees).
    // We add a 180-degree offset to the hue to match the visual wheel.
    const hue = (angle * 180 / Math.PI + 180 + 360) % 360;
    
    const saturation = radius * 100;
    
    // Opacity is a combination of the intensity setting and puck distance
    const opacity = (intensity / 100) * radius * 0.7;

    return {
        backgroundColor: `hsla(${hue}, ${saturation}%, 50%, ${opacity})`,
        mixBlendMode: blendMode as any,
    };
};


const MediaPreview: React.FC<MediaPreviewProps> = ({ mediaFile, onFileChange, textureSettings, colorSettings }) => {
  const mediaStyle: React.CSSProperties = {
    filter: `
      brightness(${1 + colorSettings.exposure / 100})
      contrast(${1 + colorSettings.contrast / 100})
      saturate(${1 + colorSettings.saturation / 100})
      hue-rotate(${colorSettings.tint}deg)
    `,
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  };

  const textureOverlayStyle: React.CSSProperties = {
    backgroundImage: `url(${textureSettings.preset.imageUrl})`,
    opacity: textureSettings.textureOpacity / 100,
    backgroundSize: 'cover',
    mixBlendMode: 'overlay',
  };
  
  const colorOverlayStyle: React.CSSProperties = {
    backgroundImage: `url(${colorSettings.lutPreset.imageUrl})`,
    backgroundSize: '100% 100%',
    mixBlendMode: 'soft-light',
    opacity: 0.5, // LUTs often applied with some opacity
  }

  const vignetteStrength = colorSettings.vignette;
  const vignetteOverlayStyle: React.CSSProperties = {
      // radial-gradient for the vignette effect
      background: `radial-gradient(ellipse at center, transparent ${70 - vignetteStrength * 0.5}%, black)`,
      // Opacity is controlled by the strength to make it subtle
      opacity: vignetteStrength / 100 * 0.8,
  };


  return (
    <div className="w-full h-full flex items-center justify-center relative p-4">
      {mediaFile ? (
        <div className="relative w-full h-full flex items-center justify-center">
          {mediaFile.type === 'image' ? (
            <img src={mediaFile.url} alt="Preview" style={mediaStyle} className="rounded-md" />
          ) : (
            <video src={mediaFile.url} style={mediaStyle} controls autoPlay loop className="rounded-md" />
          )}

          {/* Color Wheel Overlays for real-time preview */}
          <div className="absolute inset-0 pointer-events-none rounded-md" style={getColorWheelStyle(colorSettings.shadows, 'multiply')}></div>
          <div className="absolute inset-0 pointer-events-none rounded-md" style={getColorWheelStyle(colorSettings.midtones, 'overlay')}></div>
          <div className="absolute inset-0 pointer-events-none rounded-md" style={getColorWheelStyle(colorSettings.highlights, 'screen')}></div>
          <div className="absolute inset-0 pointer-events-none rounded-md" style={getColorWheelStyle(colorSettings.offset, 'soft-light')}></div>
          
          {/* Vignette Overlay */}
          <div className="absolute inset-0 pointer-events-none rounded-md" style={vignetteOverlayStyle}></div>

          <div className="absolute inset-0 pointer-events-none rounded-md" style={textureOverlayStyle}></div>
          <div className="absolute inset-0 pointer-events-none rounded-md" style={colorOverlayStyle}></div>
        </div>
      ) : (
        <div className="w-full h-full border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mb-2">Upload an Image or Video</p>
          <p className="text-sm text-gray-500">Click the button below to get started</p>
          <label className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors">
            Select File
            <input type="file" accept="image/*,video/*" className="hidden" onChange={onFileChange} />
          </label>
        </div>
      )}
    </div>
  );
};

export default MediaPreview;