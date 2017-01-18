const assert = require('assert');
const babelCore = require('babel-core');

function transform(code) {
  const result = babelCore.transform(code, {
    plugins: [
      './lib/index.js'
    ]
  });

  return result.code;
}

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
// comment-1`;

    assert.strictEqual(transform(code), expected);
  });

});
