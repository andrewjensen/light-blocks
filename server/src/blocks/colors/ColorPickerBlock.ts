import { getFieldValue } from '../../blockUtils';
import Interpreter, { ExecutionContext } from '../../Interpreter';
import { ProgramValue } from '../../ProgramValue';
import { IBlockHandler } from '../IBlockHandler';

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
