import { getNestedStatement } from '../../blockUtils.js';
import Interpreter, { ExecutionContext } from '../../Interpreter.js';
import { ProgramValue, castBooleanValue } from '../../ProgramValue.js';
import { IBlockHandler } from '../IBlockHandler.js';

export default class IfElseBlock implements IBlockHandler {
  getType() {
    return 'controls_ifelse';
  }

  async evaluate(block: Element, interpreter: Interpreter, context: ExecutionContext): Promise<ProgramValue> {
    const conditionResult = await interpreter.evaluateSubExpression(block, 'IF0', context);
    const condition = castBooleanValue(conditionResult);

    const doStatement = getNestedStatement(block, 'DO0');
    const elseStatement = getNestedStatement(block, 'ELSE');

    if (condition && doStatement) {
      await interpreter.executeSequence(doStatement, context);
    } else if (elseStatement) {
      await interpreter.executeSequence(elseStatement, context);
    }

    return { type: 'VOID' };
  }
}
