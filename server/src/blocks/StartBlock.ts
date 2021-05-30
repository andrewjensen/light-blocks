import Environment from '../Environment';
import { IBlockHandler } from './IBlockHandler';

export default class StartBlock implements IBlockHandler {
  getType() {
    return 'start';
  }

  async evaluate(block: Element, environment: Environment) {
    // Do nothing
  }
}
