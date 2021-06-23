import Interpreter from '../Interpreter';
import { ProgramValue } from '../ProgramValue';
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
