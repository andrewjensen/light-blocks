import { getNestedStatement } from '../../blockUtils';
import Interpreter, { ExecutionContext } from '../../Interpreter';
import { ProgramValue } from '../../ProgramValue';
import { IBlockHandler } from '../IBlockHandler';

export default class RunDuplicateProcessesBlock implements IBlockHandler {
  getType() {
    return 'run_duplicate_processes';
  }

  async evaluate(block: Element, interpreter: Interpreter, context: ExecutionContext): Promise<ProgramValue> {
    const sequence = getNestedStatement(block, 'PROCESS');
    if (!sequence) {
      return { type: 'VOID' };
    }

    const lightIds = interpreter.getEnvironment().getReachableLightIds();

    await Promise.all(lightIds.map(lightId => {
      const childContext = {
        ...context,
        lightId
      };
      return interpreter.executeSequence(sequence, childContext);
    }));

    return { type: 'VOID' };
  }
}
