import Interpreter, { ExecutionContext } from '../../Interpreter.js';
import { ProgramValue } from '../../ProgramValue.js';
import { IBlockHandler } from '../IBlockHandler.js';

export default class LightOnBlock implements IBlockHandler {
  getType() {
    return 'light_on';
  }

  async evaluate(block: Element, interpreter: Interpreter, context: ExecutionContext): Promise<ProgramValue> {
    await interpreter.getEnvironment().lightOn(context.lightId);

    return { type: 'VOID' };
  }
}
