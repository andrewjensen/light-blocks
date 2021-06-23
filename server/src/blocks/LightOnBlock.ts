import Interpreter, { ProgramValue } from '../Interpreter';
import { IBlockHandler } from './IBlockHandler';

export default class LightOnBlock implements IBlockHandler {
  getType() {
    return 'light_on';
  }

  async evaluate(block: Element, interpreter: Interpreter): Promise<ProgramValue> {
    await interpreter.getEnvironment().lightOn();

    return { type: 'VOID' };
  }
}
