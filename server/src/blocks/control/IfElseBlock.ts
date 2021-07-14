import { getNestedStatement } from '../../blockUtils';
import Interpreter, { ExecutionContext } from '../../Interpreter';
import { ProgramValue, castBooleanValue } from '../../ProgramValue';
import { IBlockHandler } from '../IBlockHandler';

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
