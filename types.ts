export interface Preset {
  name: string;
  imageUrl: string;
}

export interface TextureSettings {
  preset: Preset;
  grainIntensity: number;
  grainSize: number;
  flicker: number;
  scratchesAndDust: number;
  textureOpacity: number;
}

export interface ColorWheelValue {
  intensity: number;
  color: { x: number; y: number };
}

export interface ColorSettings {
  midtones: ColorWheelValue;
  shadows: ColorWheelValue;
  highlights: ColorWheelValue;
  offset: ColorWheelValue;
  whiteBalance: number;
  exposure: number;
  contrast: number;
  saturation: number;
  tint: number;
  vignette: number;
  lutPreset: Preset;
}