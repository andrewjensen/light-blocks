import Interpreter, { ExecutionContext } from '../../Interpreter';
import { ProgramValue, castNumberValue } from '../../ProgramValue';
import { IBlockHandler } from '../IBlockHandler';

export default class RandomBetweenBlock implements IBlockHandler {
  getType() {
    return 'math_random_between';
  }

  async evaluate(block: Element, interpreter: Interpreter, context: ExecutionContext): Promise<ProgramValue> {
    let min = await interpreter.evaluateSubExpression(block, 'MIN', context);
    const minValue = castNumberValue(min);

    const max = await interpreter.evaluateSubExpression(block, 'MAX', context);
    const maxValue = castNumberValue(max);

    const randomValue = (Math.random() * (maxValue - minValue)) + minValue;

    return { type: 'NUMBER', value: randomValue };
  }
}
