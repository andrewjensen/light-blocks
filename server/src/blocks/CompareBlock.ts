import Interpreter from '../Interpreter';
import { castNumberValue, ProgramValue } from '../ProgramValue';
import { IBlockHandler } from './IBlockHandler';
import { getFieldValue } from '../blockUtils';

type ComparisonOperator =
  | 'EQ'
  | 'NEQ'
  | 'LT'
  | 'LTE'
  | 'GT'
  | 'GTE';

const OP_NAMES: string[] = [
  'EQ',
  'NEQ',
  'LT',
  'LTE',
  'GT',
  'GTE',
];

export default class CompareBlock implements IBlockHandler {
  getType() {
    return 'logic_compare';
  }

  async evaluate(block: Element, interpreter: Interpreter): Promise<ProgramValue> {
    const operator = castComparisonOperator(getFieldValue(block, 'OP'));

    const left = await interpreter.evaluateSubExpression(block, 'A');
    const leftResult = castNumberValue(left);

    const right = await interpreter.evaluateSubExpression(block, 'B');
    const rightResult = castNumberValue(right);

    const comparisonResult = compare(leftResult, rightResult, operator)
    return { type: 'BOOLEAN', value: comparisonResult };
  }
}

function castComparisonOperator(op: string): ComparisonOperator {
  if (OP_NAMES.includes(op)) {
    return op as ComparisonOperator;
  } else {
    throw new Error(`Invalid operator ${op}`);
  }
}

function compare(aValue: number, bValue: number, opName: ComparisonOperator) {
  switch (opName) {
    case 'EQ':
      return aValue === bValue;
    case 'NEQ':
      return aValue !== bValue;
    case 'LT':
      return aValue < bValue;
    case 'LTE':
      return aValue <= bValue;
    case 'GT':
      return aValue > bValue;
    case 'GTE':
      return aValue >= bValue;
    default:
      throw new Error('Unreachable');
  }
}
