'use strict';

const generateRandom = require('../index');

describe('generateRandom', () => {
  // ── Return type and length ────────────────────────────────────────────────

  it('returns a string for all types', () => {
    ['number', 'alphabet', 'alphaNumeric', 'anything'].forEach((type) => {
      expect(typeof generateRandom(8, type)).toBe('string');
    });
  });

  it('returns a string of exactly the requested length (default 16)', () => {
    expect(generateRandom().length).toBe(16);
    expect(generateRandom(1).length).toBe(1);
    expect(generateRandom(32).length).toBe(32);
    expect(generateRandom(1024).length).toBe(1024);
  });

  // ── Character-set correctness ─────────────────────────────────────────────

  it('returns only digit characters for type "number"', () => {
    expect(generateRandom(64, 'number')).toMatch(/^\d+$/);
  });

  it('returns only alphabet characters for type "alphabet"', () => {
    expect(generateRandom(64, 'alphabet')).toMatch(/^[A-Za-z]+$/);
  });

  it('returns only alphanumeric characters for type "alphaNumeric"', () => {
    expect(generateRandom(64, 'alphaNumeric')).toMatch(/^[A-Za-z0-9]+$/);
  });

  it('returns printable non-space characters for type "anything"', () => {
    expect(generateRandom(128, 'anything')).toMatch(/^\S+$/);
  });

  // ── Named export ─────────────────────────────────────────────────────────

  it('is also available as a named export', () => {
    const { generateRandom: named } = require('../index');
    expect(typeof named).toBe('function');
    expect(named(8, 'alphabet').length).toBe(8);
  });

  // ── CHAR_SETS export ──────────────────────────────────────────────────────

  it('exports CHAR_SETS with the four supported types', () => {
    const { CHAR_SETS } = require('../index');
    expect(CHAR_SETS).toHaveProperty('number');
    expect(CHAR_SETS).toHaveProperty('alphabet');
    expect(CHAR_SETS).toHaveProperty('alphaNumeric');
    expect(CHAR_SETS).toHaveProperty('anything');
  });

  // ── Input validation – length ─────────────────────────────────────────────

  it('throws RangeError when length is 0', () => {
    expect(() => generateRandom(0)).toThrow(RangeError);
  });

  it('throws RangeError when length is negative', () => {
    expect(() => generateRandom(-1)).toThrow(RangeError);
  });

  it('throws RangeError when length is greater than 1024', () => {
    expect(() => generateRandom(1025)).toThrow(RangeError);
  });

  it('throws RangeError when length is a non-integer', () => {
    expect(() => generateRandom(3.5)).toThrow(RangeError);
  });

  it('throws RangeError when length is not a number', () => {
    expect(() => generateRandom('abc')).toThrow(RangeError);
  });

  // ── Input validation – type ───────────────────────────────────────────────

  it('throws TypeError for an unsupported type', () => {
    expect(() => generateRandom(8, 'invalid')).toThrow(TypeError);
  });

  it('throws TypeError for a numeric type argument', () => {
    expect(() => generateRandom(8, 42)).toThrow(TypeError);
  });

  // ── Uniqueness (statistical smoke-test) ──────────────────────────────────

  it('generates distinct values on successive calls', () => {
    const results = new Set(Array.from({ length: 20 }, () => generateRandom(16, 'alphaNumeric')));
    // Chance of collision across 20 truly random 16-char strings is astronomically low
    expect(results.size).toBe(20);
  });
});
