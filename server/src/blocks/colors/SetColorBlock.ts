import Interpreter, { ExecutionContext } from '../../Interpreter';
import { castColorValue, ProgramValue } from '../../ProgramValue';
import { IBlockHandler } from '../IBlockHandler';

export default class SetColorBlock implements IBlockHandler {
  getType() {
    return 'set_color';
  }

  async evaluate(block: Element, interpreter: Interpreter, context: ExecutionContext): Promise<ProgramValue> {
    let colorResult = await interpreter.evaluateSubExpression(block, 'COLOR', context);
    let { hue, saturation, brightness } = castColorValue(colorResult);

    await interpreter.getEnvironment().setColor(context.lightId, hue, saturation, brightness);

    return { type: 'VOID' };
  }
}
