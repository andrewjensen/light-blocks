import { getNestedStatement } from '../../blockUtils.js';
import Interpreter, { ExecutionContext } from '../../Interpreter.js';
import { ProgramValue } from '../../ProgramValue.js';
import { IBlockHandler } from '../IBlockHandler.js';

export default class LoopForeverBlock implements IBlockHandler {
  getType() {
    return 'loop_forever';
  }

  async evaluate(block: Element, interpreter: Interpreter, context: ExecutionContext): Promise<ProgramValue> {

    const firstBlock = getNestedStatement(block, 'LOOP_BODY');
    if (!firstBlock) {
      throw new Error('Loop has no body to execute');
    }

    while (true) {
      if (interpreter.isTerminating()) {
        break;
      }

      await interpreter.executeSequence(firstBlock, context);
    }

    return { type: 'VOID' };
  }
}
