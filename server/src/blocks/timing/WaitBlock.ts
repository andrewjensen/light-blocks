import { pause } from '../../timingUtils.js';
import Interpreter, { ExecutionContext } from '../../Interpreter.js';
import { ProgramValue, castNumberValue } from '../../ProgramValue.js';
import { IBlockHandler } from '../IBlockHandler.js';

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
