import { pause } from '../timingUtils';
import Interpreter, { ProgramValue } from '../Interpreter';
import { IBlockHandler } from './IBlockHandler';
import { getNestedValue } from '../blockUtils';

export default class WaitBlock implements IBlockHandler {
  getType() {
    return 'wait';
  }

  async evaluate(block: Element, interpreter: Interpreter): Promise<ProgramValue> {
    const timeExpression = getNestedValue(block, 'TIME');
    if (!timeExpression) {
      throw new Error('Wait block is missing time expression');
    }

    const timeResult = await interpreter.evaluate(timeExpression);
    if (timeResult.type !== 'NUMBER') {
      throw new Error('Time is not a number');
    }
    const timeSeconds = timeResult.value;
    const timeMillis = Math.floor(timeSeconds * 1000);

    await pause(timeMillis);

    return { type: 'VOID' };
  }
}
