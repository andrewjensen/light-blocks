import Interpreter from '../../Interpreter';
import { ProgramValue } from '../../ProgramValue';
import { IBlockHandler } from '../IBlockHandler';
import { getFieldValue } from '../../blockUtils';

export default class NumberBlock implements IBlockHandler {
  getType() {
    return 'math_number';
  }

  async evaluate(block: Element, interpreter: Interpreter): Promise<ProgramValue> {
    const value = parseFloat(getFieldValue(block, 'NUM'));

    return { type: 'NUMBER', value };
  }
}
