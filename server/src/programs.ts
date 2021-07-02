import { ProgramMeta } from './types';
import { Program } from './db';

interface EditProgramParams {
  title?: string
}

export async function listPrograms(): Promise<ProgramMeta[]> {
  const programs = await Program.findAll();
  return programs.map(program => getMeta(program));;
}

export async function getProgram(id: number): Promise<ProgramMeta | null> {
  const program = await Program.findOne({
    where: { id }
  });
  if (program) {
    return getMeta(program);
  } else {
    return null;
  }
}

export async function createProgram(title: string): Promise<ProgramMeta> {
  const program = await Program.create({ title });
  return getMeta(program);
}

export async function editProgram(id: number, params: EditProgramParams): Promise<ProgramMeta | null> {
  const program = await Program.findOne({
    where: { id }
  });

  if (!program) {
    throw new Error('Program not found');
  }

  if (params.title) {
    program.title = params.title;
  }

  const updatedProgram = await program.save();
  return getMeta(updatedProgram);
}

export async function deleteProgram(id: number): Promise<void> {
  const program = await Program.findOne({
    where: { id }
  });

  if (!program) {
    throw new Error('Program not found');
  }

  await program.destroy();
}

function getMeta(program: Program): ProgramMeta {
  return {
    id: program.id,
    title: program.title
  };
}
