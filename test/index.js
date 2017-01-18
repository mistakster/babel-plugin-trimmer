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
  it('should trim all code if "trim-below" marker at the top', () => {
    const code = `// trim-below
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

  it.skip('should trim leave banner comment', () => {
    const code = `
/* banner */
// trim-below
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

    const expected = `
/* banner */`;

    assert.strictEqual(transform(code), expected);
  });

  it('should trim code and comments after "trim-below" marker', () => {
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

  it('should trim leave all code if "trim-below" marker at the bottom', () => {
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
// trim-below
`;

    const expected = `
function Tips() {
  return 321;
}
// comment-1
/* comment-2 */
// comment-3
function printTips() {
  return 123;
}
// comment-4`;

    assert.strictEqual(transform(code), expected);
  });

  it('should trim the code if "trim-below" marker is a block comment', () => {
    const code = `
function Tips() {
  return 321;
}
// comment-1
/*

trim-below

*/
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

  it('should trim the code after "trim-below" marker inside block statement', () => {
    const code = `
function Tips() {
  return 321;
}
// comment-1
function printTips() {
  var x = 0;
  // comment-2
  // trim-below
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
  var x = 0;
  // comment-2
}
// comment-4`;

    assert.strictEqual(transform(code), expected);
  });

  it.skip('should leave banner inside block statement', () => {
    const code = `
function Tips() {
  return 321;
}
// comment-1
function printTips() {
  // banner
  // trim-below
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
  // banner
}
// comment-4`;

    assert.strictEqual(transform(code), expected);
  });

});
