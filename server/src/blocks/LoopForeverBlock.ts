import { getNestedStatement } from '../blockUtils';
import Interpreter from '../Interpreter';
import { ProgramValue } from '../ProgramValue';
import { IBlockHandler } from './IBlockHandler';

export default class LoopForeverBlock implements IBlockHandler {
  getType() {
    return 'loop_forever';
  }

  async evaluate(block: Element, interpreter: Interpreter): Promise<ProgramValue> {

    const firstBlock = getNestedStatement(block, 'LOOP_BODY');
    if (!firstBlock) {
      throw new Error('Loop has no body to execute');
    }

    while (true) {
      await interpreter.executeSequence(firstBlock);
    }

    return { type: 'VOID' };
  }
}
