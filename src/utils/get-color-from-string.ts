import ColorHashModule from 'color-hash';

type ColorHashModuleType = typeof ColorHashModule;
type ColorHashType = ColorHashModuleType & {
  default: ColorHashModuleType;
};

//! https://github.com/zenozeng/color-hash/issues/42
const ColorHash = (ColorHashModule as unknown as ColorHashType).default;

const colorHash = new ColorHash({
  lightness: 0.6,
  saturation: 0.4,
});

export const getColorFromString = (str: string): string => {
  const tagHsl: number[] = colorHash.hsl(str);
  const tagColor = `hsla(${tagHsl[0]},${tagHsl[1] * 100}%,${tagHsl[2] * 100}%,0.5)`;
  return tagColor;
};
