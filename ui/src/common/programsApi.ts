import { ProgramMeta } from '../common/types';
import { SERVER_HOST } from '../common/constants';

export async function listPrograms(): Promise<ProgramMeta[]> {
  const response = await fetch(`${SERVER_HOST}/api/programs`);
  const body = await response.json();

  return body;
}

export async function getProgram(programId: number): Promise<ProgramMeta> {
  const response = await fetch(`${SERVER_HOST}/api/programs/${programId}`);
  const body = await response.json();

  return body;
}

export async function createProgram(title: string): Promise<ProgramMeta> {
  const params = { title };
  const response = await fetch(`${SERVER_HOST}/api/programs`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const body = await response.json();

  return body;
}

// TODO: lock down `params`
export async function editProgram(programId: number, params: unknown): Promise<ProgramMeta> {
  const response = await fetch(`${SERVER_HOST}/api/programs/${programId}`, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const body = await response.json();

  return body;
}

export async function deleteProgram(programId: number): Promise<void> {
  const response = await fetch(`${SERVER_HOST}/api/programs/${programId}`, {
    method: 'DELETE'
  });
  await response.json();
}
