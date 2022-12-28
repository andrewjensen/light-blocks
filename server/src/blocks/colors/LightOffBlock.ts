import Interpreter, { ExecutionContext } from '../../Interpreter.js';
import { ProgramValue } from '../../ProgramValue.js';
import { IBlockHandler } from '../IBlockHandler.js';

export default class LightOffBlock implements IBlockHandler {
  getType() {
    return 'light_off';
  }

  async evaluate(block: Element, interpreter: Interpreter, context: ExecutionContext): Promise<ProgramValue> {
    await interpreter.getEnvironment().lightOff(context.lightId);

    return { type: 'VOID' };
  }
}
