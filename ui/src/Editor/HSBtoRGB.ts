// Courtesy of https://www.30secondsofcode.org/js/s/hsb-to-rgb
export function HSBToRGB(h: number, s: number, b: number): [r: number, g: number, b: number] {
  s /= 100;
  b /= 100;
  const k = (n: number) => (n + h / 60) % 6;
  const f = (n: number) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};
