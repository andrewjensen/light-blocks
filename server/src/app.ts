import express from 'express';
import { Server } from 'socket.io';
import * as http from 'http';
import path from 'path';
import cors from 'cors';
import { text as textBodyParser } from 'body-parser';

import { connectToDB } from './db';
import Interpreter, { InterpreterEvent } from './Interpreter';
import Environment from './Environment';
import installProgramRoutes from './api/programs';
import installInterpreterRoutes from './api/interpreter';
import logger from './logger';

const REQUIRED_ENV_VARS = [
  'HUE_BRIDGE_IP_ADDRESS',
  'HUE_BRIDGE_CLIENT_KEY',
  'HUE_BRIDGE_USER',
];

for (let envVar of REQUIRED_ENV_VARS) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required env var: ${envVar}`);
  }
}

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

const environment = new Environment();
const interpreter = new Interpreter(environment);
interpreter.setEventListener((event: InterpreterEvent) => {
  io.emit('message', event);
});

installProgramRoutes(app);
installInterpreterRoutes(app, interpreter);

async function run() {
  await connectToDB();
  await environment.initialize();

  server.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
  });
}

run();
