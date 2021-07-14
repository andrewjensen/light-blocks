import { getNestedStatement } from '../../blockUtils';
import Interpreter, { ExecutionContext } from '../../Interpreter';
import { ProgramValue } from '../../ProgramValue';
import { IBlockHandler } from '../IBlockHandler';

export default class RunDistinctProcessesBlock implements IBlockHandler {
  getType() {
    return 'run_distinct_processes';
  }

  async evaluate(block: Element, interpreter: Interpreter, context: ExecutionContext): Promise<ProgramValue> {
    const sequences = [
      getNestedStatement(block, 'PROCESS1'),
      getNestedStatement(block, 'PROCESS2'),
      getNestedStatement(block, 'PROCESS3'),
      getNestedStatement(block, 'PROCESS4'),
    ];

    await Promise.all(sequences.map((sequence, idx) => {
      if (sequence) {
        const childContext = {
          ...context,
          lightId: idx + 1
        };
        return interpreter.executeSequence(sequence, childContext);
      } else {
        return Promise.resolve();
      }
    }));

    return { type: 'VOID' };
  }
}
