import { v3 as NodeHueApi, model } from 'node-hue-api';
import { Api } from 'node-hue-api/dist/esm/api/Api';

import { pause } from './timingUtils';

const DEFAULT_TRANSITION_TIME_MS = 1000;

const GROUP_NAME = 'light-blocks-v1';

export default class Environment {
  private client: Api | null
  private group: model.Group | null

  constructor() {
    this.client = null;
    this.group = null;
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
  }

  async getOrCreateLightGroup(): Promise<model.Group | null> {
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

  async lightOn() {
    // TODO: check which use case we are in

    const newState = new model.GroupState()
      .on()
      .transition(DEFAULT_TRANSITION_TIME_MS);

    return Promise.all([
      this.client!.groups.setGroupState(this.group!, newState),
      pause(DEFAULT_TRANSITION_TIME_MS)
    ]);
  }

  async lightOff() {
    const newState = new model.GroupState()
      .off()
      .transition(DEFAULT_TRANSITION_TIME_MS);

    return Promise.all([
      this.client!.groups.setGroupState(this.group!, newState),
      pause(DEFAULT_TRANSITION_TIME_MS)
    ]);
  }

  async setColor(hue: number, saturation: number, brightness: number) {
    const hueScaled = hue * 182.0;

    console.log(`setColor ${hueScaled} ${saturation} ${brightness}`);

    const newState = new model.GroupState()
      .on()
      .hue(hueScaled)
      .saturation(saturation)
      .brightness(brightness)
      .transition(DEFAULT_TRANSITION_TIME_MS);

    return Promise.all([
      this.client!.groups.setGroupState(this.group!, newState),
      pause(DEFAULT_TRANSITION_TIME_MS)
    ]);
  }
}
