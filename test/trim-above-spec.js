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

describe('trim-above', () => {
  it('should trim leave all code if "trim-above" marker at the top', () => {
    const code = `// trim-above
function Tips() {
  return 321;
}
// comment-1
/* comment-2 */
// comment-3
function printTips() {
  return 123;
}
// comment-4
`;

    const expected = ``;

    assert.strictEqual(transform(code), expected);
  });

  it('should trim code and comments before "trim-above" marker', () => {
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

    const expected = `// comment-3
function printTips() {
  return 123;
}
// comment-4
`;

    assert.strictEqual(transform(code), expected);
  });

  it('should trim all code if "trim-above" marker at the bottom', () => {
    const code = `
function Tips() {
  return 321;
}
// comment-1
/* comment-2 */
// comment-3
function printTips() {
  return 123;
}
// comment-4
// trim-above
`;

    const expected = ``;

    assert.strictEqual(transform(code), expected);
  });

  it('should trim the code if "trim-above" marker is a block comment', () => {
    const code = `
function Tips() {
  return 321;
}
// comment-1
/*

trim-above

*/
// comment-3
function printTips() {
  return 123;
}
// comment-4
`;

    const expected = `// comment-3
function printTips() {
  return 123;
}
// comment-4`;

    assert.strictEqual(transform(code), expected);
  });

  it('should trim the code before "trim-above" marker inside block statement', () => {
    const code = `
function Tips() {
  return 321;
}
// comment-1
function printTips() {
  var x = 0;
  // comment-2
  // trim-above
  // comment-3
  return x;
}
// comment-4
`;

    const expected = `
function Tips() {
  return 321;
}
// comment-1
function printTips() {
  // comment-3
  return x;
}
// comment-4`;

    assert.strictEqual(transform(code), expected);
  });

});
