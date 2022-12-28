import Interpreter, { ExecutionContext } from '../../Interpreter.js';
import { ProgramValue } from '../../ProgramValue.js';
import { IBlockHandler } from '../IBlockHandler.js';
import { getFieldValue } from '../../blockUtils.js';

export default class NumberBlock implements IBlockHandler {
  getType() {
    return 'math_number';
  }

  async evaluate(block: Element, interpreter: Interpreter, context: ExecutionContext): Promise<ProgramValue> {
    const value = parseFloat(getFieldValue(block, 'NUM'));

    return { type: 'NUMBER', value };
  }
}
