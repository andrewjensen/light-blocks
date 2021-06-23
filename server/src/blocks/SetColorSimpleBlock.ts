import { pause } from '../timingUtils';
import Interpreter, { ProgramValue } from '../Interpreter';
import { IBlockHandler } from './IBlockHandler';
import { getFieldValue } from '../blockUtils';

export default class SetColorSimpleBlock implements IBlockHandler {
  getType() {
    return 'set_color_simple';
  }

  async evaluate(block: Element, interpreter: Interpreter): Promise<ProgramValue> {
    const hue = parseInt(getFieldValue(block, 'HUE'));
    const saturation = parseInt(getFieldValue(block, 'SATURATION'));
    const brightness = parseInt(getFieldValue(block, 'BRIGHTNESS'));

    await interpreter.getEnvironment().setColor(hue, saturation, brightness);

    return { type: 'VOID' };
  }
}
