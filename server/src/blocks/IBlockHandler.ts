import Interpreter, { ExecutionContext } from '../Interpreter.js';
import { ProgramValue } from '../ProgramValue.js';

export interface IBlockHandler {
  getType: () => string
  evaluate: (
    block: Element,
    interpreter: Interpreter,
    context: ExecutionContext
  ) => Promise<ProgramValue>
}
