export function modulo(input: number, modulus: number): number {
  let shifted = input;
  while (shifted < 0.0) {
    shifted += modulus;
  }

  return shifted % modulus;
}

export function clamp(input: number, min: number, max: number): number {
  let clamped = input;
  if (input < min) {
    clamped = min;
  }
  if (input > max) {
    clamped = max;
  }
  return clamped;
}
