export type ProgramValueColor = { type: 'COLOR', hue: number, saturation: number, brightness: number }
export type ProgramValueNumber = { type: 'NUMBER', value: number }
export type ProgramValueBoolean = { type: 'BOOLEAN', value: boolean }
export type ProgramValueVoid = { type: 'VOID' }

export type ProgramValue =
  | ProgramValueColor
  | ProgramValueNumber
  | ProgramValueBoolean
  | ProgramValueVoid;

export type ProgramType =
  | 'COLOR'
  | 'NUMBER'
  | 'BOOLEAN'
  | 'VOID';

export function castNumberValue(result: ProgramValue): number {
  if (result.type !== 'NUMBER') {
    throw new Error(`sub-expression result is incorrect type - expected 'NUMBER' but got ${result.type}`);
  }
  return result.value;
}

export function castBooleanValue(result: ProgramValue): boolean {
  if (result.type !== 'BOOLEAN') {
    throw new Error(`sub-expression result is incorrect type - expected 'BOOLEAN' but got ${result.type}`);
  }
  return result.value;
}

export function castColorValue(result: ProgramValue): ProgramValueColor {
  if (result.type !== 'COLOR') {
    throw new Error(`sub-expression result is incorrect type - expected 'COLOR' but got ${result.type}`);
  }
  return result;
}
