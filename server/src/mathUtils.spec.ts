import { clamp, modulo } from './mathUtils.js';

describe('modulo', () => {
  it('returns the modulo of some positive numbers', () => {
    expect(modulo(2, 3)).toEqual(2);
    expect(modulo(15, 10)).toEqual(5);
    expect(modulo(23, 12)).toEqual(11);
    expect(modulo(0, 360)).toEqual(0);
    expect(modulo(360, 360)).toEqual(0);
    expect(modulo(720, 360)).toEqual(0);
    expect(modulo(400, 360)).toEqual(40);
  });

  it('returns the modulo of some negative numbers', () => {
    expect(modulo(-1, 5)).toEqual(4);
    expect(modulo(-4, 10)).toEqual(6);
    expect(modulo(-50, 100)).toEqual(50);
    expect(modulo(-100000, 100)).toEqual(0);
    expect(modulo(-120, 360)).toEqual(240);
    expect(modulo(-360, 360)).toEqual(0);
    expect(modulo(-360000, 360)).toEqual(0);
  });

  it('handles decimal values', () => {
    expect(modulo(5.2, 3)).toEqual(2.2);
    expect(modulo(-4.5, 10)).toEqual(5.5);
  });
});

describe('clamp', () => {
  it('keeps results within the minimum and maximum', () => {
    expect(clamp(5, 0, 10)).toEqual(5);
    expect(clamp(-5, 0, 10)).toEqual(0);
    expect(clamp(15, 0, 10)).toEqual(10);
    expect(clamp(75, 50, 100)).toEqual(75);
    expect(clamp(25, 50, 100)).toEqual(50);
    expect(clamp(125, 50, 100)).toEqual(100);
  });
});
