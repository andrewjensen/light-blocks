import { getNestedStatement } from '../blockUtils';
import Interpreter from '../Interpreter';
import { ProgramValue, castNumberValue } from '../ProgramValue';
import { IBlockHandler } from './IBlockHandler';

export default class LoopNTimesBlock implements IBlockHandler {
  getType() {
    return 'loop_n_times';
  }

  async evaluate(block: Element, interpreter: Interpreter): Promise<ProgramValue> {
    const repeatTimesResult = await interpreter.evaluateSubExpression(block, 'REPEAT_TIMES');
    const repeatTimes = Math.floor(castNumberValue(repeatTimesResult));

    const firstBlock = getNestedStatement(block, 'LOOP_BODY');
    if (!firstBlock) {
      throw new Error('Loop has no body to execute');
    }

    for (let i = 0; i < repeatTimes; i++) {
      await interpreter.executeSequence(firstBlock);
    }

    return { type: 'VOID' };
  }
}
