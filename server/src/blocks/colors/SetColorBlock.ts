import Interpreter from '../../Interpreter';
import { castColorValue, ProgramValue } from '../../ProgramValue';
import { IBlockHandler } from '../IBlockHandler';

export default class SetColorBlock implements IBlockHandler {
  getType() {
    return 'set_color';
  }

  async evaluate(block: Element, interpreter: Interpreter): Promise<ProgramValue> {
    let colorResult = await interpreter.evaluateSubExpression(block, 'COLOR');
    let { hue, saturation, brightness } = castColorValue(colorResult);

    await interpreter.getEnvironment().setColor(hue, saturation, brightness);

    return { type: 'VOID' };
  }
}
