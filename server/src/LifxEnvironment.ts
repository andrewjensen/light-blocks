import { clamp, modulo } from './mathUtils';

import { pause } from './timingUtils';

const DEFAULT_TRANSITION_TIME_MS = 1000;

export default class LifxEnvironment {
  constructor() {
  }

  async initialize() {
    console.log('Initializing LIFX light environment...');

    // TODO: implement
  }

  getReachableLightIds(): number[] {
    // TODO: implement
    return [];
  }

  async lightOn(lightId: number | null): Promise<unknown> {
    // TODO: implement
    return Promise.resolve();
  }

  async lightOff(lightId: number | null): Promise<unknown> {
    // TODO: implement
    return Promise.resolve();
  }

  async setColor(lightId: number | null, hue: number, saturation: number, brightness: number) {
    const hueRotated = modulo(hue, 360);
    const hueScaled = hueRotated * 182.0;

    const saturationClamped = clamp(saturation, 0, 100);
    const brightnessClamped = clamp(brightness, 0, 100);

    console.log(`setColor ${hueScaled} ${saturationClamped} ${brightnessClamped}`);

    // TODO: implement
    return Promise.resolve();
  }
}
