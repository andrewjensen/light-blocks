import { pause } from '../timingUtils';
import Environment from '../Environment';
import { IBlockHandler } from './IBlockHandler';
import { getFieldValue } from '../blockUtils';

export default class WaitBlock implements IBlockHandler {
  getType() {
    return 'wait';
  }

  async evaluate(block: Element, environment: Environment) {
    const rawTime = getFieldValue(block, 'TIME');
    const timeSeconds = parseFloat(rawTime);
    const timeMillis = Math.floor(timeSeconds * 1000);

    await pause(timeMillis);
  }
}
