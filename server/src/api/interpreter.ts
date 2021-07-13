import express from 'express';
import { json as jsonBodyParser } from 'body-parser';
import { getProgram } from '../programs';
import Interpreter from '../Interpreter';

export default function installInterpreterRoutes(app: express.Application, interpeter: Interpreter) {
  const router = express.Router();
  router.use(jsonBodyParser());

  app.use('/api/interpreter', router);

  router.post('/run/:programId', async (req: express.Request, res: express.Response) => {
    const programId = parseInt(req.params.programId);
    const program = await getProgram(programId);
    if (!program) {
      return res.status(404).json({});
    }

    interpeter.setProgram(program.source);
    interpeter.run();

    res.status(201).json({});
  });

  router.post('/stop', async (req: express.Request, res: express.Response) => {
    // FIXME: stop the program

    res.status(201).json({});
  });
}
