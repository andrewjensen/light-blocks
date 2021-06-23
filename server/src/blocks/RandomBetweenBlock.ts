import Interpreter, { ProgramValue } from '../Interpreter';
import { IBlockHandler } from './IBlockHandler';
import { getNestedValue } from '../blockUtils';

export default class RandomBetweenBlock implements IBlockHandler {
  getType() {
    return 'math_random_between';
  }

  async evaluate(block: Element, interpreter: Interpreter): Promise<ProgramValue> {
    const minExpression = getNestedValue(block, 'MIN');
    if (!minExpression) {
      throw new Error('RandomBetween block is missing min expression');
    }

    const minResult = await interpreter.evaluate(minExpression);
    if (minResult.type !== 'NUMBER') {
      throw new Error('Min is not a number');
    }
    const minValue = minResult.value;

    const maxExpression = getNestedValue(block, 'MAX');
    if (!maxExpression) {
      throw new Error('RandomBetween block is missing max expression');
    }

    const maxResult = await interpreter.evaluate(maxExpression);
    if (maxResult.type !== 'NUMBER') {
      throw new Error('Min is not a number');
    }
    const maxValue = maxResult.value;

    console.log(`min ${minValue}, max ${maxValue}`);

    const randomValue = (Math.random() * (maxValue - minValue)) + minValue;
    console.log('random number chosen:', randomValue);

    return { type: 'NUMBER', value: randomValue };
  }
}
