import Interpreter from '../Interpreter';
import { castNumberValue, ProgramValue } from '../ProgramValue';
import { IBlockHandler } from './IBlockHandler';

export default class ColorFromComponentsBlock implements IBlockHandler {
  getType() {
    return 'color_components';
  }

  async evaluate(block: Element, interpreter: Interpreter): Promise<ProgramValue> {
    let hueResult = await interpreter.evaluateSubExpression(block, 'HUE');
    const hue = castNumberValue(hueResult);

    let saturationResult = await interpreter.evaluateSubExpression(block, 'SATURATION');
    const saturation = castNumberValue(saturationResult);

    let brightnessResult = await interpreter.evaluateSubExpression(block, 'BRIGHTNESS');
    const brightness = castNumberValue(brightnessResult);

    return {
      type: 'COLOR',
      hue,
      saturation,
      brightness
    };
  }
}
