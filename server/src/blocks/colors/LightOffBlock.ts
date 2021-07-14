import Interpreter, { ExecutionContext } from '../../Interpreter';
import { ProgramValue } from '../../ProgramValue';
import { IBlockHandler } from '../IBlockHandler';

export default class LightOffBlock implements IBlockHandler {
  getType() {
    return 'light_off';
  }

  async evaluate(block: Element, interpreter: Interpreter, context: ExecutionContext): Promise<ProgramValue> {
    await interpreter.getEnvironment().lightOff(context.lightId);

    return { type: 'VOID' };
  }
}
