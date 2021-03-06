import Interpreter, { ExecutionContext } from '../../Interpreter';
import { castNumberValue, ProgramValue } from '../../ProgramValue';
import { IBlockHandler } from '../IBlockHandler';

export default class ColorFromComponentsBlock implements IBlockHandler {
  getType() {
    return 'color_components';
  }

  async evaluate(block: Element, interpreter: Interpreter, context: ExecutionContext): Promise<ProgramValue> {
    let hueResult = await interpreter.evaluateSubExpression(block, 'HUE', context);
    const hue = castNumberValue(hueResult);

    let saturationResult = await interpreter.evaluateSubExpression(block, 'SATURATION', context);
    const saturation = castNumberValue(saturationResult);

    let brightnessResult = await interpreter.evaluateSubExpression(block, 'BRIGHTNESS', context);
    const brightness = castNumberValue(brightnessResult);

    return {
      type: 'COLOR',
      hue,
      saturation,
      brightness
    };
  }
}
