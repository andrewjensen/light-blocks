import Dotenv from 'dotenv';
import express from 'express';
import { Server } from 'socket.io';
import * as http from 'http';
import cors from 'cors';
import { text as textBodyParser } from 'body-parser';

import { connectToDB } from './db';
import Interpreter, { InterpreterEvent } from './Interpreter';
import Environment from './Environment';
import installProgramRoutes from './api/programs';
import installInterpreterRoutes from './api/interpreter';

Dotenv.config();

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
const port = 4000;
const environment = new Environment();

const interpreter = new Interpreter(environment);
interpreter.setEventListener((event: InterpreterEvent) => {
  io.emit('message', event);
});

app.use(cors());
app.use(textBodyParser());

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send("Hello world");
});

app.post('/program', (req: express.Request, res: express.Response) => {
  interpreter.setProgram(req.body);
  interpreter.run();

  res.status(201).send("Received program");
});

installProgramRoutes(app);
installInterpreterRoutes(app);

async function run() {
  await connectToDB();
  await environment.initialize();

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

run();
