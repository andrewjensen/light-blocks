import { getFieldValue } from '../blockUtils';
import Interpreter from '../Interpreter';
import { ProgramValue } from '../ProgramValue';
import { IBlockHandler } from './IBlockHandler';

const REGEX_HEX_CODE = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/;

export default class ColorSimpleBlock implements IBlockHandler {
  getType() {
    return 'color_simple';
  }

  async evaluate(block: Element, interpreter: Interpreter): Promise<ProgramValue> {
    const hexCode = getFieldValue(block, 'COLOR');

    const match = hexCode.match(REGEX_HEX_CODE);
    if (!match) {
      throw new Error('Color is not a hex code');
    }

    const [_full, rr, gg, bb] = match;
    const red = parseInt(rr, 16);
    const green = parseInt(gg, 16);
    const blue = parseInt(bb, 16);

    const [hue, saturation, brightness] = RGBToHSB(red, green, blue);

    return {
      type: 'COLOR',
      hue,
      saturation,
      brightness
    };
  }
}

// Courtesy of https://www.30secondsofcode.org/js/s/rgb-to-hsb
function RGBToHSB(r: number, g: number, b: number): [hue: number, saturation: number, brightness: number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b),
    n = v - Math.min(r, g, b);
  const h =
    n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
  return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
};
