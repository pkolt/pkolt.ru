import ColorHashModule from 'color-hash';

type ColorHashType = typeof ColorHashModule;
type ColorHashFixType = ColorHashType & {
  default: ColorHashType;
};

//! https://github.com/zenozeng/color-hash/issues/42
const ColorHash =
  'default' in ColorHashModule ? (ColorHashModule as unknown as ColorHashFixType).default : ColorHashModule;

const colorHash = new ColorHash({
  lightness: 0.6,
  saturation: 0.4,
});

export const getColorFromString = (str: string): string => {
  const tagHsl: number[] = colorHash.hsl(str);
  const tagColor = `hsla(${tagHsl[0]},${tagHsl[1] * 100}%,${tagHsl[2] * 100}%,0.5)`;
  return tagColor;
};
