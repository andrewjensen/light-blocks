import { getNestedStatement } from '../../blockUtils.js';
import Interpreter, { ExecutionContext } from '../../Interpreter.js';
import { ProgramValue } from '../../ProgramValue.js';
import { IBlockHandler } from '../IBlockHandler.js';

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
