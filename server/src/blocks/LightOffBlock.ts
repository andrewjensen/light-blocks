import Interpreter, { ProgramValue } from '../Interpreter';
import { IBlockHandler } from './IBlockHandler';

export default class LightOffBlock implements IBlockHandler {
  getType() {
    return 'light_off';
  }

  async evaluate(block: Element, interpreter: Interpreter): Promise<ProgramValue> {
    await interpreter.getEnvironment().lightOff();

    return { type: 'VOID' };
  }
}
