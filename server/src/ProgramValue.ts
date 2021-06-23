export type ProgramValueNumber = { type: 'NUMBER', value: number }
export type ProgramValueVoid = { type: 'VOID' }

export type ProgramValue =
  | ProgramValueNumber
  | ProgramValueVoid;

export type ProgramType =
  | 'NUMBER'
  | 'VOID';

export function castNumberValue(result: ProgramValue): number {
  if (result.type !== 'NUMBER') {
    throw new Error(`sub-expression result is incorrect type - expected 'NUMBER' but got ${result.type}`);
  }
  return result.value;
}
