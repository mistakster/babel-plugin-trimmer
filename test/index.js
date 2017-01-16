const assert = require('assert');
const babelCore = require('babel-core');

describe('babel-plugin-trimmer', () => {
  it('should trim all code after "trim-below" marker', () => {
    const code = `
function decrement(a) {
  return a - 1;
}
// trim-below
/**
 * block comment
 */
function square(n) {
  // inline comment
  foo === undefined;
  return n * n;
}
`;

    const expected = `
function decrement(a) {
  return a - 1;
}
// trim-below
/**
 * block comment
 */`;

    const result = babelCore.transform(code, {
      plugins: [
        './lib/index.js'
      ]
    });

    assert.strictEqual(result.code, expected);
  });

  it('should trim all code before "trim-above" marker', () => {
    const code = `
function decrement(a) {
  return a - 1;
}
// trim-above
/**
 * block comment
 */
function square(n) {
  // inline comment
  foo === undefined;
  return n * n;
}
`;

    const expected = `
// trim-above
/**
 * block comment
 */
function square(n) {
  // inline comment
  foo === undefined;
  return n * n;
}`;

    const result = babelCore.transform(code, {
      plugins: [
        './lib/index.js'
      ]
    });

    assert.strictEqual(result.code, expected);
  });

  it('should trim all code before "trim-above" marker at the bottom', () => {
    const code = `
function decrement(a) {
  return a - 1;
}
// trim-above
`;

    const expected = `
// trim-above
`;

    const result = babelCore.transform(code, {
      plugins: [
        './lib/index.js'
      ]
    });

    assert.strictEqual(result.code, expected);
  });
});
