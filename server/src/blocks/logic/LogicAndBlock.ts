import Interpreter, { ExecutionContext } from '../../Interpreter';
import { castBooleanValue, ProgramValue } from '../../ProgramValue';
import { IBlockHandler } from '../IBlockHandler';

export default class LogicAndBlock implements IBlockHandler {
  getType() {
    return 'logic_and';
  }

  async evaluate(block: Element, interpreter: Interpreter, context: ExecutionContext): Promise<ProgramValue> {
    const left = await interpreter.evaluateSubExpression(block, 'A', context);
    const leftResult = castBooleanValue(left);

    const right = await interpreter.evaluateSubExpression(block, 'B', context);
    const rightResult = castBooleanValue(right);

    return { type: 'BOOLEAN', value: leftResult && rightResult };
  }
}
