import fetch from 'node-fetch';

import { clamp, modulo } from './mathUtils.js';
import { pause } from './timingUtils.js';

const DEFAULT_TRANSITION_TIME_MS = 1000;

export default class LifxEnvironment {
  private apiToken: string

  constructor() {
    this.apiToken = process.env.LIFX_API_TOKEN || '';
  }

  async initialize() {
    console.log('Initializing LIFX light environment...');

    const allLightsResponse = await fetch('https://api.lifx.com/v1/lights/all', {
      headers: {
        'Authorization': `Bearer ${this.apiToken}`
      }
    });
    const allLightsJson = await allLightsResponse.json;

    console.log('All lights result:', allLightsJson);
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
