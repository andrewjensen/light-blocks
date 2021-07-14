import { pause } from '../../timingUtils';
import Interpreter, { ExecutionContext } from '../../Interpreter';
import { ProgramValue, castNumberValue } from '../../ProgramValue';
import { IBlockHandler } from '../IBlockHandler';

export default class WaitBlock implements IBlockHandler {
  getType() {
    return 'wait';
  }

  async evaluate(block: Element, interpreter: Interpreter, context: ExecutionContext): Promise<ProgramValue> {
    let time = await interpreter.evaluateSubExpression(block, 'TIME', context);
    const timeSeconds = castNumberValue(time);
    const timeMillis = Math.floor(timeSeconds * 1000);

    await pause(timeMillis);

    return { type: 'VOID' };
  }
}
