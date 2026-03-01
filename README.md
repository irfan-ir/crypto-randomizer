# crypto-randomizer

[![npm version](https://img.shields.io/npm/v/crypto-randomizer.svg)](https://www.npmjs.com/package/crypto-randomizer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A Node.js package that generates **cryptographically secure** random strings using the built-in [`crypto`](https://nodejs.org/api/crypto.html) module.  
It replaces `Math.random()` — which is **not** cryptographically secure — with `crypto.randomBytes()`, making it safe for security-sensitive use-cases such as session tokens, API keys, password reset codes, and OTPs.

---

## Features

- ✅ Uses Node.js built-in `crypto.randomBytes()` — no third-party runtime dependencies
- ✅ **Bias-free** — rejection sampling eliminates modulo bias
- ✅ Supports four character sets: digits, alphabets, alphanumeric, and extended special characters
- ✅ Strict input validation with descriptive errors
- ✅ Full TypeScript type declarations included
- ✅ 100 % test coverage

---

## Requirements

- Node.js **≥ 12.0.0**

---

## Installation

```bash
npm install crypto-randomizer
```

---

## Usage

### CommonJS

```js
const generateRandom = require('crypto-randomizer');

// 16-digit numeric string (default)
console.log(generateRandom());           // e.g. "7284016395821047"

// 8-character alphabetic string
console.log(generateRandom(8, 'alphabet'));       // e.g. "gKtRwPmQ"

// 12-character alphanumeric string
console.log(generateRandom(12, 'alphaNumeric'));  // e.g. "aB3xZ9qR1mWv"

// 16-character string with special characters
console.log(generateRandom(16, 'anything'));      // e.g. "aB3!xZ@9qR#1mWv$"
```

### Named export

```js
const { generateRandom } = require('crypto-randomizer');

const token = generateRandom(32, 'alphaNumeric');
```

### TypeScript / ESM (via `ts-node` or a bundler)

```ts
import generateRandom from 'crypto-randomizer';
// or: import { generateRandom } from 'crypto-randomizer';

const apiKey: string = generateRandom(32, 'alphaNumeric');
```

---

## API

### `generateRandom(length?, type?)`

| Parameter | Type     | Default      | Description |
|-----------|----------|--------------|-------------|
| `length`  | `number` | `16`         | Length of the returned string. Must be a **positive integer** between **1** and **1024**. |
| `type`    | `string` | `'number'`   | Character set to use (see table below). |

**Returns:** `string` — a random string of exactly `length` characters.

#### Supported `type` values

| Value            | Character set |
|------------------|---------------|
| `'number'`       | `0–9` |
| `'alphabet'`     | `A–Z`, `a–z` |
| `'alphaNumeric'` | `A–Z`, `a–z`, `0–9` |
| `'anything'`     | `A–Z`, `a–z`, `0–9`, `!@#$%^&*()-_=+[]{}|;:,.<>?` |

#### Throws

| Error | When |
|-------|------|
| `RangeError` | `length` is not a positive integer between 1 and 1024 |
| `TypeError`  | `type` is not one of the four supported values |

---

## Security

- **`crypto.randomBytes()`** is backed by the operating system's CSPRNG (`/dev/urandom` on Linux/macOS, `BCryptGenRandom` on Windows), making it suitable for cryptographic use.
- **Rejection sampling** is used to select characters so that every character in the set is equally likely (no modulo bias).
- There is **no insecure fallback** — the function throws on invalid input rather than silently returning a weak value.
- No external runtime dependencies means a minimal attack surface.

---

## Running Tests

```bash
npm test
```

Tests use [Jest](https://jestjs.io/) and cover all character sets, boundary conditions, input validation, and the uniqueness property of generated values.

---

## License

[MIT](LICENSE)


