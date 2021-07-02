import { SERVER_HOST } from '../common/constants';

export async function runProgram(programId: number): Promise<void> {
  const response = await fetch(`${SERVER_HOST}/api/interpreter/run/${programId}`, {
    method: 'POST'
  });
  await response.json();
}

export async function stop(): Promise<void> {
  const response = await fetch(`${SERVER_HOST}/api/interpreter/stop`, {
    method: 'POST'
  });
  await response.json();
}
