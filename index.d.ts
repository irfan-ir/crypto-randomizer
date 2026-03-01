/**
 * Supported character-set types for generateRandom.
 *
 * - `'number'`       – digits 0–9
 * - `'alphabet'`     – upper- and lower-case Latin letters (A–Z, a–z)
 * - `'alphaNumeric'` – letters and digits
 * - `'anything'`     – letters, digits, and common special characters
 */
export type RandomType = 'number' | 'alphabet' | 'alphaNumeric' | 'anything';

/**
 * Generates a cryptographically secure random string.
 *
 * @param length - Length of the output string. Must be a positive integer between 1 and 1024. Defaults to `16`.
 * @param type   - Character set to draw from. Defaults to `'number'`.
 * @returns A random string of exactly `length` characters drawn from the chosen character set.
 * @throws {RangeError} When `length` is not a positive integer between 1 and 1024.
 * @throws {TypeError}  When `type` is not one of the supported values.
 */
declare function generateRandom(length?: number, type?: RandomType): string;

export { generateRandom };
export default generateRandom;

/** The character sets used internally, exported for reference. */
export declare const CHAR_SETS: Record<RandomType, string>;

module.exports = generateRandom;
