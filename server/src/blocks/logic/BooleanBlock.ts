import Interpreter from '../../Interpreter';
import { ProgramValue } from '../../ProgramValue';
import { IBlockHandler } from '../IBlockHandler';
import { getFieldValue } from '../../blockUtils';

export default class BooleanBlock implements IBlockHandler {
  getType() {
    return 'logic_boolean';
  }

  async evaluate(block: Element, interpreter: Interpreter): Promise<ProgramValue> {
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
