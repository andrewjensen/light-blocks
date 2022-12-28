import express from 'express';
import { Server } from 'socket.io';
import * as http from 'http';
import path from 'path';
import cors from 'cors';
import { text as textBodyParser } from 'body-parser';

import { connectToDB } from './db';
import Interpreter, { InterpreterEvent } from './Interpreter';
import HueEnvironment from './HueEnvironment';
import LifxEnvironment from './LifxEnvironment';
import installProgramRoutes from './api/programs';
import installInterpreterRoutes from './api/interpreter';
import { LightEnvironment } from './types';

const ADAPTER_ENV_VARS: { [adapterName: string]: string[] } = {
  'HUE': [
    'HUE_BRIDGE_IP_ADDRESS',
    'HUE_BRIDGE_CLIENT_KEY',
    'HUE_BRIDGE_USER',
  ],
  'LIFX': [
    'LIFX_API_TOKEN',
  ],
};

const ADAPTER_CREATORS: { [adapterName: string]: () => LightEnvironment } = {
  'HUE': () => new HueEnvironment(),
  'LIFX': () => new LifxEnvironment(),
};

validateEnv();

const DIR_STATIC = path.resolve(__dirname, '../../ui/build/');

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
const port = 4000;

app.use(cors());
app.use(textBodyParser());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(DIR_STATIC));
}

const adapterType = process.env['ADAPTER_TYPE']!;
const environment: LightEnvironment = ADAPTER_CREATORS[adapterType]();
const interpreter = new Interpreter(environment);
interpreter.setEventListener((event: InterpreterEvent) => {
  io.emit('message', event);
});

app.post('/program', (req: express.Request, res: express.Response) => {
  interpreter.setProgram(req.body);
  interpreter.run();

  res.status(201).send("Received program");
});

installProgramRoutes(app);
installInterpreterRoutes(app, interpreter);

async function run() {
  await connectToDB();
  await environment.initialize();

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

function validateEnv() {
  const adapterType = process.env['ADAPTER_TYPE'];

  if (!adapterType) {
    throw new Error(`Missing required env var: ADAPTER_TYPE`);
  }

  if (!ADAPTER_ENV_VARS.hasOwnProperty(adapterType)) {
    throw new Error(`Invalid value for ADAPTER_TYPE env var: ${adapterType}`);
  }

  const adapterSpecificEnvVars = ADAPTER_ENV_VARS[adapterType];
  for (let envVar of adapterSpecificEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required env var for adapter: ${envVar}`);
    }
  }
}

run();
