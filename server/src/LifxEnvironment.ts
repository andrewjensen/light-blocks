import fetch from 'node-fetch';

import { clamp, modulo } from './mathUtils';
import { pause } from './timingUtils';
import logger from './logger';
import { LightEnvironment } from './types';

type TransitionOptions = {
  isOn: boolean;
  durationMs: number;
  color?: {
    hue: number;
    saturation: number;
    brightness: number;
  }
}

const DEFAULT_TRANSITION_TIME_MS = 1000;

const SELECTOR_ALL = 'all';

export default class LifxEnvironment implements LightEnvironment {
  private numericIdsToLifxIds: Record<number, string>;
  private reachableIds: number[];

  constructor() {
    this.numericIdsToLifxIds = {};
    this.reachableIds = [];
  }

  async initialize() {
    logger.info('Initializing LIFX light environment...');

    const lights = await getAllLights();
    for (let idx = 0; idx < lights.length; idx++) {
      const numericId = idx + 1;
      const light = lights[idx];
      const lifxId = light.id;

      this.numericIdsToLifxIds[numericId] = lifxId;

      if (light.connected) {
        this.reachableIds.push(numericId);
      }
    }
  }

  getReachableLightIds(): number[] {
    return this.reachableIds;
  }

  async lightOn(lightId: number | null): Promise<unknown> {
    if (lightId) {
      const lifxId = this.numericIdsToLifxIds[lightId];
      return Promise.all([
        setLightState(lifxId, {
          isOn: true,
          durationMs: DEFAULT_TRANSITION_TIME_MS,
        }),
        pause(DEFAULT_TRANSITION_TIME_MS),
      ]);
    } else {
      return Promise.all([
        setLightState(SELECTOR_ALL, {
          isOn: true,
          durationMs: DEFAULT_TRANSITION_TIME_MS,
        }),
        pause(DEFAULT_TRANSITION_TIME_MS),
      ]);
    }
  }

  async lightOff(lightId: number | null): Promise<unknown> {
    if (lightId) {
      const lifxId = this.numericIdsToLifxIds[lightId];
      return Promise.all([
        setLightState(lifxId, {
          isOn: false,
          durationMs: DEFAULT_TRANSITION_TIME_MS,
        }),
        pause(DEFAULT_TRANSITION_TIME_MS),
      ]);
    } else {
      return Promise.all([
        setLightState(SELECTOR_ALL, {
          isOn: false,
          durationMs: DEFAULT_TRANSITION_TIME_MS,
        }),
        pause(DEFAULT_TRANSITION_TIME_MS),
      ]);
    }
  }

  async setColor(lightId: number | null, hue: number, saturation: number, brightness: number) {
    const hueRotated = modulo(hue, 360);

    const saturationClamped = clamp(saturation / 100, 0.0, 1.0);
    const brightnessClamped = clamp(brightness / 100, 0.0, 1.0);

    logger.debug(`setColor ${hueRotated} ${saturationClamped} ${brightnessClamped}`);

    if (lightId) {
      const lifxId = this.numericIdsToLifxIds[lightId];
      return Promise.all([
        setLightState(lifxId, {
          isOn: true,
          durationMs: DEFAULT_TRANSITION_TIME_MS,
          color: {
            hue: hueRotated,
            saturation: saturationClamped,
            brightness: brightnessClamped,
          }
        }),
        pause(DEFAULT_TRANSITION_TIME_MS),
      ]);
    } else {
      return Promise.all([
        setLightState(SELECTOR_ALL, {
          isOn: true,
          durationMs: DEFAULT_TRANSITION_TIME_MS,
          color: {
            hue: hueRotated,
            saturation: saturationClamped,
            brightness: brightnessClamped,
          }
        }),
        pause(DEFAULT_TRANSITION_TIME_MS),
      ]);
    }
  }
}

async function getAllLights() {
  const response = await fetch('https://api.lifx.com/v1/lights/all', {
    headers: {
      'Authorization': `Bearer ${process.env.LIFX_API_TOKEN}`,
    },
  });
  const responseJson = await response.json();

  return responseJson;
}

async function setLightState(selector: string, options: TransitionOptions) {
  const requestBody: Record<string, any> = {
    power: options.isOn ? 'on' : 'off',
    duration: options.durationMs / 1000,
  };

  if (options.color) {
    requestBody['color'] = `hue:${options.color.hue} saturation:${options.color.saturation} brightness:${options.color.brightness}`;
  }

  // See:
  // https://api.developer.lifx.com/reference/set-state
  const response = await fetch(`https://api.lifx.com/v1/lights/${selector}/state`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${process.env.LIFX_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  const responseJson = await response.json();

  return responseJson;
}
