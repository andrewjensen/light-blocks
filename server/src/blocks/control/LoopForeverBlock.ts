import { getNestedStatement } from '../../blockUtils';
import Interpreter, { ExecutionContext } from '../../Interpreter';
import { ProgramValue } from '../../ProgramValue';
import { IBlockHandler } from '../IBlockHandler';

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
      await interpreter.executeSequence(firstBlock, context);
    }

    return { type: 'VOID' };
  }
}
