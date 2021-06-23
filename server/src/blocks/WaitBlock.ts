import { pause } from '../timingUtils';
import Interpreter from '../Interpreter';
import { ProgramValue, castNumberValue } from '../ProgramValue';
import { IBlockHandler } from './IBlockHandler';

export default class WaitBlock implements IBlockHandler {
  getType() {
    return 'wait';
  }

  async evaluate(block: Element, interpreter: Interpreter): Promise<ProgramValue> {
    let time = await interpreter.evaluateSubExpression(block, 'TIME');
    const timeSeconds = castNumberValue(time);
    const timeMillis = Math.floor(timeSeconds * 1000);

    await pause(timeMillis);

    return { type: 'VOID' };
  }
}
