import { getFieldValue } from '../../blockUtils.js';
import Interpreter, { ExecutionContext } from '../../Interpreter.js';
import { ProgramValue } from '../../ProgramValue.js';
import { IBlockHandler } from '../IBlockHandler.js';

type ColorComponents = {
  hue: number,
  saturation: number,
  brightness: number,
}

export default class ColorPickerBlock implements IBlockHandler {
  getType() {
    return 'color_picker';
  }

  async evaluate(block: Element, interpreter: Interpreter, context: ExecutionContext): Promise<ProgramValue> {
    const rawColorComponents = getFieldValue(block, 'COLOR');

    const {
      hue,
      saturation,
      brightness
    } = parseColorComponents(rawColorComponents);

    return {
      type: 'COLOR',
      hue,
      saturation,
      brightness
    };
  }
}

function parseColorComponents(serialized: string): ColorComponents {
  const [hue, saturation, brightness] = serialized.split(',');
  return {
    hue: parseInt(hue),
    saturation: parseInt(saturation),
    brightness: parseInt(brightness),
  };
}
