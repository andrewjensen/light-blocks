import express from 'express';
import { json as jsonBodyParser } from 'body-parser';
import { getProgram } from '../programs';

export default function installInterpreterRoutes(app: express.Application) {
  const router = express.Router();
  router.use(jsonBodyParser());

  app.use('/api/interpreter', router);

  router.post('/run/:programId', async (req: express.Request, res: express.Response) => {
    // TODO: run a program

    const programId = parseInt(req.params.programId);
    const program = await getProgram(programId);

    res.status(201).json({});
  });

  router.post('/stop', async (req: express.Request, res: express.Response) => {
    // TODO: stop the program

    res.status(201).json({});
  });
}
