const assert = require('assert');
const babelCore = require('babel-core');

describe('babel-plugin-trimmer', function () {
  it('should work', function () {
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

    const result = babelCore.transform(code, {
      plugins: [
        './lib/index.js'
      ]
    });

    assert.strictEqual(result.code, `
function decrement(a) {
  return a - 1;
}
// trim-below
/**
 * block comment
 */`)
  });
});
