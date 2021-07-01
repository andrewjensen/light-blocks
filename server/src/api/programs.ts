import express from 'express';

interface ProgramMeta {
  id: number
  title: string
}

const MOCK_PROGRAMS: ProgramMeta[] = [
  {
    id: 1,
    title: 'Sunset Vibes'
  },
  {
    id: 2,
    title: 'Blockrunner 2049'
  },
  {
    id: 3,
    title: 'My Cool Setup'
  }
];


export default function installProgramRoutes(app: express.Application) {
  app.get('/api/programs', (req: express.Request, res: express.Response) => {
    // TODO: list programs

    res.status(200).json(MOCK_PROGRAMS);
  });

  app.get('/api/programs/:id', (req: express.Request, res: express.Response) => {
    // TODO: list program by id

    const programId = parseInt(req.params.id);
    const program = MOCK_PROGRAMS.find(program => program.id === programId);

    res.status(200).json(program);
  });

  app.post('/api/programs', (req: express.Request, res: express.Response) => {
    // TODO: create program
  });

  app.put('/api/programs/:id', (req: express.Request, res: express.Response) => {
    // TODO: update program by id
  });

  app.delete('/api/programs/:id', (req: express.Request, res: express.Response) => {
    // TODO: delete program by id
  });
}
