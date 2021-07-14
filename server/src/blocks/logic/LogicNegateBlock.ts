import Interpreter, { ExecutionContext } from '../../Interpreter';
import { castBooleanValue, ProgramValue } from '../../ProgramValue';
import { IBlockHandler } from '../IBlockHandler';

export default class LogicNegateBlock implements IBlockHandler {
  getType() {
    return 'logic_negate';
  }

  async evaluate(block: Element, interpreter: Interpreter, context: ExecutionContext): Promise<ProgramValue> {
    const inner = await interpreter.evaluateSubExpression(block, 'BOOL', context);
    const innerResult = castBooleanValue(inner);

    return { type: 'BOOLEAN', value: !innerResult };
  }
}
