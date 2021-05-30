import Dotenv from 'dotenv';
import express from 'express';
import * as http from 'http';
import cors from 'cors';
import { text as textBodyParser } from 'body-parser';

import Interpreter from './Interpreter';
import Environment from './Environment';

Dotenv.config();

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 4000;
const environment = new Environment();
const interpreter = new Interpreter(environment);

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

async function run() {
  await environment.initialize();

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

run();
