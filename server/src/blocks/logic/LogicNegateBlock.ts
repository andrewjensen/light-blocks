import Interpreter, { ExecutionContext } from '../../Interpreter.js';
import { castBooleanValue, ProgramValue } from '../../ProgramValue.js';
import { IBlockHandler } from '../IBlockHandler.js';

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
