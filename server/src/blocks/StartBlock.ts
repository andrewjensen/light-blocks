import Interpreter from '../Interpreter';
import { ProgramValue } from '../ProgramValue';
import { IBlockHandler } from './IBlockHandler';

export default class StartBlock implements IBlockHandler {
  getType() {
    return 'start';
  }

  async evaluate(block: Element, interpreter: Interpreter): Promise<ProgramValue> {
    // Do nothing
    return { type: 'VOID' }
  }
}
