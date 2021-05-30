import Environment from '../Environment';
import { IBlockHandler } from './IBlockHandler';

export default class LightOnBlock implements IBlockHandler {
  getType() {
    return 'light_on';
  }

  async evaluate(block: Element, environment: Environment) {
    await environment.lightOn();
  }
}
