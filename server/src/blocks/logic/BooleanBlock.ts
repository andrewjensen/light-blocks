import Interpreter, { ExecutionContext } from '../../Interpreter.js';
import { ProgramValue } from '../../ProgramValue.js';
import { IBlockHandler } from '../IBlockHandler.js';
import { getFieldValue } from '../../blockUtils.js';

export default class BooleanBlock implements IBlockHandler {
  getType() {
    return 'logic_boolean';
  }

  async evaluate(block: Element, interpreter: Interpreter, context: ExecutionContext): Promise<ProgramValue> {
    const value = getFieldValue(block, 'BOOL');
    switch (value) {
      case 'TRUE':
        return { type: 'BOOLEAN', value: true };
      case 'FALSE':
        return { type: 'BOOLEAN', value: false };
      default:
        throw new Error('Invalid boolean field value');
    }
  }
}
