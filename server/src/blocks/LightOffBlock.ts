import Environment from '../Environment';
import { IBlockHandler } from './IBlockHandler';

export default class LightOffBlock implements IBlockHandler {
  getType() {
    return 'light_off';
  }

  async evaluate(block: Element, environment: Environment) {
    await environment.lightOff();
  }
}
