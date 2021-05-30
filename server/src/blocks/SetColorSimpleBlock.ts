import { pause } from '../timingUtils';
import Environment from '../Environment';
import { IBlockHandler } from './IBlockHandler';
import { getFieldValue } from '../blockUtils';

export default class SetColorSimpleBlock implements IBlockHandler {
  getType() {
    return 'set_color_simple';
  }

  async evaluate(block: Element, environment: Environment) {
    const hue = parseInt(getFieldValue(block, 'HUE'));
    const saturation = parseInt(getFieldValue(block, 'SATURATION'));
    const brightness = parseInt(getFieldValue(block, 'BRIGHTNESS'));

    await environment.setColor(hue, saturation, brightness);
  }
}
