const assert = require('assert');
const babelCore = require('babel-core');

describe('babel-plugin-trimmer', () => {
  it('should trim all code after "trim-below" marker', () => {
    const code = `
function Tips() {
  return 321;
}
// comment-1
// trim-below
// comment-3
function printTips() {
  return 123;
}
// comment-4
`;

    const expected = `
function Tips() {
  return 321;
}
// comment-1
// trim-below
// comment-3`;

    const result = babelCore.transform(code, {
      plugins: [
        './lib/index.js'
      ]
    });

    assert.strictEqual(result.code, expected);
  });

  it('should trim all code before "trim-above" marker', () => {
    const code = `
function Tips() {
  return 321;
}
// comment-1
// trim-above
// comment-3
function printTips() {
  return 123;
}
// comment-4
`;

    const expected = `
// comment-1
// trim-above
// comment-3
function printTips() {
  return 123;
}
// comment-4`;

    const result = babelCore.transform(code, {
      plugins: [
        './lib/index.js'
      ]
    });

    assert.strictEqual(result.code, expected);
  });
});
