import Interpreter from '../Interpreter';
import { ProgramValue } from '../ProgramValue';

export interface IBlockHandler {
  getType: () => string
  evaluate: (block: Element, interpreter: Interpreter) => Promise<ProgramValue>
}
