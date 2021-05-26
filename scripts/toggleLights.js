require('dotenv').config()
const v3 = require('node-hue-api').v3;
const hueApi = v3.api;
const LightState = v3.lightStates.LightState;

const USERNAME = process.env.HUE_BRIDGE_USER;
const IP_ADDRESS = process.env.HUE_BRIDGE_IP_ADDRESS;

async function run() {
  const client = await hueApi.createLocal(IP_ADDRESS).connect(USERNAME);

  const lights = await client.lights.getAll();

  lights
    .filter(l => l.state.reachable === true)
    .forEach(light => {
      console.log('Light:');
      console.log(`  ID: ${light.id}`);
      console.log(`  Type: ${light.type}`);
      console.log(`  State: ${JSON.stringify(light.state, null, 2)}`);

      // TODO: use the LightState class instead?
      client.lights.setLightState(light.id, {
        on: !light.state.on,
        hue: (light.state.hue + (182 * 30)) % 65535,
        brightness: 60
      });
    });
}

run();
