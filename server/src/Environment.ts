import { v3 as NodeHueApi, model } from 'node-hue-api';
import { Api } from 'node-hue-api/dist/esm/api/Api';
import { clamp, modulo } from './mathUtils';

import { pause } from './timingUtils';

const DEFAULT_TRANSITION_TIME_MS = 1000;

const GROUP_NAME = 'light-blocks-v1';

export default class Environment {
  private client: Api | null
  private group: model.Group | null
  private reachableLightIds: number[]

  constructor() {
    this.client = null;
    this.group = null;
    this.reachableLightIds = [];
  }

  async initialize() {
    console.log('Initializing environment...');

    const username = process.env.HUE_BRIDGE_USER || '';
    const ipAddress = process.env.HUE_BRIDGE_IP_ADDRESS || '';

    this.client =
      await NodeHueApi
        .api
        .createLocal(ipAddress)
        .connect(username);

    this.group = await this.getOrCreateLightGroup();

    const lights = await this.client.lights.getAll();

    this.reachableLightIds = lights
      .filter(light => {
        // @ts-ignore
        const isReachable: boolean = light.state.reachable;
        return isReachable;
      })
      .map(light => light.id as number);

    console.log(`  Reachable light IDs: ${this.reachableLightIds.join(', ')}`);
  }

  getReachableLightIds(): number[] {
    return this.reachableLightIds;
  }

  async lightOn(lightId: number | null): Promise<unknown> {
    if (lightId) {
      const newState = new model.LightState()
        .on()
        .transition(DEFAULT_TRANSITION_TIME_MS);

      return Promise.all([
        this.client!.lights.setLightState(lightId, newState),
        pause(DEFAULT_TRANSITION_TIME_MS)
      ]);
    } else {
      const newState = new model.GroupState()
        .on()
        .transition(DEFAULT_TRANSITION_TIME_MS);

      return Promise.all([
        this.client!.groups.setGroupState(this.group!, newState),
        pause(DEFAULT_TRANSITION_TIME_MS)
      ]);
    }
  }

  async lightOff(lightId: number | null): Promise<unknown> {
    if (lightId) {
      const newState = new model.LightState()
        .off()
        .transition(DEFAULT_TRANSITION_TIME_MS);

      return Promise.all([
        this.client!.lights.setLightState(lightId, newState),
        pause(DEFAULT_TRANSITION_TIME_MS)
      ]);
    } else {
      const newState = new model.GroupState()
        .off()
        .transition(DEFAULT_TRANSITION_TIME_MS);

      return Promise.all([
        this.client!.groups.setGroupState(this.group!, newState),
        pause(DEFAULT_TRANSITION_TIME_MS)
      ]);
    }
  }

  async setColor(lightId: number | null, hue: number, saturation: number, brightness: number) {
    const hueRotated = modulo(hue, 360);
    const hueScaled = hueRotated * 182.0;

    const saturationClamped = clamp(saturation, 0, 100);
    const brightnessClamped = clamp(brightness, 0, 100);

    console.log(`setColor ${hueScaled} ${saturationClamped} ${brightnessClamped}`);

    if (lightId) {
      const newState = new model.LightState()
        .on()
        .hue(hueScaled)
        .saturation(saturationClamped)
        .brightness(brightnessClamped)
        .transition(DEFAULT_TRANSITION_TIME_MS);

      return Promise.all([
        this.client!.lights.setLightState(lightId, newState),
        pause(DEFAULT_TRANSITION_TIME_MS)
      ]);
    } else {
      const newState = new model.GroupState()
        .on()
        .hue(hueScaled)
        .saturation(saturationClamped)
        .brightness(brightnessClamped)
        .transition(DEFAULT_TRANSITION_TIME_MS);

      return Promise.all([
        this.client!.groups.setGroupState(this.group!, newState),
        pause(DEFAULT_TRANSITION_TIME_MS)
      ]);
    }
  }

  private async getOrCreateLightGroup(): Promise<model.Group | null> {
    const possibleGroups = await this.client!.groups.getGroupByName(GROUP_NAME);
    const foundGroup = possibleGroups.find(group => group.name === GROUP_NAME);

    if (foundGroup) {
      console.log('  Found existing light group to use');
      return foundGroup;
    } else {
      const lights = await this.client!.lights.getAll();

      const groupSettings = NodeHueApi.model.createLightGroup();
      groupSettings.name = GROUP_NAME;
      groupSettings.lights = lights.map(light => `${light.id}`);

      const createdGroup = await this.client!.groups.createGroup(groupSettings);
      console.log('  Created new light group to use');

      return createdGroup;
    }
  }
}
