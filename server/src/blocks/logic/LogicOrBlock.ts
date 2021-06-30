import Interpreter from '../../Interpreter';
import { castBooleanValue, ProgramValue } from '../../ProgramValue';
import { IBlockHandler } from '../IBlockHandler';

export default class LogicOrBlock implements IBlockHandler {
  getType() {
    return 'logic_or';
  }

  async evaluate(block: Element, interpreter: Interpreter): Promise<ProgramValue> {
    const left = await interpreter.evaluateSubExpression(block, 'A');
    const leftResult = castBooleanValue(left);

    const right = await interpreter.evaluateSubExpression(block, 'B');
    const rightResult = castBooleanValue(right);

    return { type: 'BOOLEAN', value: leftResult || rightResult };
  }
}
