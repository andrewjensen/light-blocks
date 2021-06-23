import Interpreter, { ProgramValue } from '../Interpreter';

export interface IBlockHandler {
  getType: () => string
  evaluate: (block: Element, interpreter: Interpreter) => Promise<ProgramValue>
}
