'use strict';

const crypto = require('crypto');

const CHAR_SETS = {
  number: '0123456789',
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  alphaNumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  anything: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?',
};

/**
 * Generates a cryptographically secure random string.
 *
 * @param {number} [length=16] - Length of the generated string (1–1024).
 * @param {'number'|'alphabet'|'alphaNumeric'|'anything'} [type='number'] - Character set to use.
 * @returns {string} A random string of the requested length and type.
 * @throws {RangeError} If length is not a positive integer between 1 and 1024.
 * @throws {TypeError} If type is not one of the supported values.
 */
const generateRandom = (length = 16, type = 'number') => {
  if (!Number.isInteger(length) || length < 1 || length > 1024) {
    throw new RangeError('length must be a positive integer between 1 and 1024');
  }

  const charSet = CHAR_SETS[type];
  if (!charSet) {
    throw new TypeError(`type must be one of: ${Object.keys(CHAR_SETS).join(', ')}`);
  }

  const charSetLength = charSet.length;
  // Largest multiple of charSetLength that fits in a byte (0–255).
  // Bytes >= maxValidByte are discarded to eliminate modulo bias.
  const maxValidByte = 256 - (256 % charSetLength);

  let result = '';
  while (result.length < length) {
    // Request extra bytes upfront to reduce loop iterations
    const randomBytes = crypto.randomBytes(Math.ceil((length - result.length) * 2));
    for (let i = 0; i < randomBytes.length && result.length < length; i++) {
      const byte = randomBytes[i];
      if (byte < maxValidByte) {
        result += charSet[byte % charSetLength];
      }
    }
  }

  return result;
};

module.exports = generateRandom;
module.exports.generateRandom = generateRandom;
module.exports.CHAR_SETS = CHAR_SETS;