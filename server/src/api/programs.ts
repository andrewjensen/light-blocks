import express from 'express';
import { json as jsonBodyParser } from 'body-parser';

import {
  listPrograms,
  getProgram,
  createProgram,
  editProgram,
  deleteProgram
} from '../programs.js';

export default function installProgramRoutes(app: express.Application) {
  const router = express.Router();
  router.use(jsonBodyParser());

  app.use('/api/programs', router);

  router.get('/', async (req: express.Request, res: express.Response) => {
    const programs = await listPrograms();

    res.status(200).json(programs);
  });

  router.get('/:id', async (req: express.Request, res: express.Response) => {
    const programId = parseInt(req.params.id);
    const program = await getProgram(programId);

    if (program) {
      res.status(200).json(program);
    } else {
      res.status(404).json({ error: 'not found' });
    }
  });

  router.post('/', async (req: express.Request, res: express.Response) => {
    const title = req.body.title;
    const program = await createProgram(title);

    res.status(200).json(program);
  });

  router.put('/:id', async (req: express.Request, res: express.Response) => {
    const programId = parseInt(req.params.id);
    const params = req.body;
    const updatedProgram = await editProgram(programId, params);

    res.status(200).json(updatedProgram);
  });

  router.delete('/:id', async (req: express.Request, res: express.Response) => {
    const programId = parseInt(req.params.id);
    await deleteProgram(programId);

    res.status(200).json({});
  });
}
