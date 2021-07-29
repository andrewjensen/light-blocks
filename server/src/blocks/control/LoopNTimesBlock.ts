import { getNestedStatement } from '../../blockUtils';
import Interpreter, { ExecutionContext } from '../../Interpreter';
import { ProgramValue, castNumberValue } from '../../ProgramValue';
import { IBlockHandler } from '../IBlockHandler';

export default class LoopNTimesBlock implements IBlockHandler {
  getType() {
    return 'loop_n_times';
  }

  async evaluate(block: Element, interpreter: Interpreter, context: ExecutionContext): Promise<ProgramValue> {
    const repeatTimesResult = await interpreter.evaluateSubExpression(block, 'REPEAT_TIMES', context);
    const repeatTimes = Math.floor(castNumberValue(repeatTimesResult));

    const firstBlock = getNestedStatement(block, 'LOOP_BODY');
    if (!firstBlock) {
      throw new Error('Loop has no body to execute');
    }

    for (let i = 0; i < repeatTimes; i++) {
      if (interpreter.isTerminating()) {
        break;
      }

      await interpreter.executeSequence(firstBlock, context);
    }

    return { type: 'VOID' };
  }
}
