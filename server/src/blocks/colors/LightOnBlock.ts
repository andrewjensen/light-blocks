import Interpreter, { ExecutionContext } from '../../Interpreter';
import { ProgramValue } from '../../ProgramValue';
import { IBlockHandler } from '../IBlockHandler';

export default class LightOnBlock implements IBlockHandler {
  getType() {
    return 'light_on';
  }

  async evaluate(block: Element, interpreter: Interpreter, context: ExecutionContext): Promise<ProgramValue> {
    await interpreter.getEnvironment().lightOn(context.lightId);

    return { type: 'VOID' };
  }
}
