import { getNestedStatement } from '../../blockUtils';
import Interpreter from '../../Interpreter';
import { ProgramValue, castBooleanValue } from '../../ProgramValue';
import { IBlockHandler } from '../IBlockHandler';

export default class IfElseBlock implements IBlockHandler {
  getType() {
    return 'controls_ifelse';
  }

  async evaluate(block: Element, interpreter: Interpreter): Promise<ProgramValue> {
    const conditionResult = await interpreter.evaluateSubExpression(block, 'IF0');
    const condition = castBooleanValue(conditionResult);

    const doStatement = getNestedStatement(block, 'DO0');
    const elseStatement = getNestedStatement(block, 'ELSE');

    if (condition && doStatement) {
      await interpreter.executeSequence(doStatement);
    } else if (elseStatement) {
      await interpreter.executeSequence(elseStatement);
    }

    return { type: 'VOID' };
  }
}
