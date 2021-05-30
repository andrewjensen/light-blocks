import { v3 as NodeHueApi } from 'node-hue-api';
import { Api } from 'node-hue-api/dist/esm/api/Api';

const DEFAULT_TRANSITION_TIME_MS = 1000;

export default class Environment {
  private client: Api | null
  private lightId: number | null

  constructor() {
    this.client = null;
    this.lightId = null;
  }

  async initialize() {
    console.log('Initializing environment...');

    const username = process.env.HUE_BRIDGE_USER || '';
    const ipAddress = process.env.HUE_BRIDGE_IP_ADDRESS || '';
    this.lightId = parseInt(process.env.LIGHT_ID || '');

    this.client =
      await NodeHueApi
        .api
        .createLocal(ipAddress)
        .connect(username);
  }

  async lightOn() {
    return Promise.all([
      this.client!.lights.setLightState(this.lightId!, {
        on: true,
        transitionInMillis: DEFAULT_TRANSITION_TIME_MS
      }),
      pause(DEFAULT_TRANSITION_TIME_MS)
    ]);
  }

  async lightOff() {
    return Promise.all([
      this.client!.lights.setLightState(this.lightId!, {
        on: false,
        transitionInMillis: DEFAULT_TRANSITION_TIME_MS
      }),
      pause(DEFAULT_TRANSITION_TIME_MS)
    ]);
  }
}

async function pause(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
