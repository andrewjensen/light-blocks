export type ProgramValueColor = { type: 'COLOR', hue: number, saturation: number, brightness: number }
export type ProgramValueNumber = { type: 'NUMBER', value: number }
export type ProgramValueVoid = { type: 'VOID' }

export type ProgramValue =
  | ProgramValueColor
  | ProgramValueNumber
  | ProgramValueVoid;

export type ProgramType =
  | 'COLOR'
  | 'NUMBER'
  | 'VOID';

export function castNumberValue(result: ProgramValue): number {
  if (result.type !== 'NUMBER') {
    throw new Error(`sub-expression result is incorrect type - expected 'NUMBER' but got ${result.type}`);
  }
  return result.value;
}

export function castColorValue(result: ProgramValue): ProgramValueColor {
  if (result.type !== 'COLOR') {
    throw new Error(`sub-expression result is incorrect type - expected 'COLOR' but got ${result.type}`);
  }
  return result;
}
