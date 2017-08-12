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

describe('trim-between', () => {
  it('should trim  all code if "trim-below" marker at the top and "trim-above" at the bottom ', () => {
    const code = `// trim-below
function Tips() {
  return 321;
}
function someTips() {
  return 2222;
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

    const expected = '';

    assert.strictEqual(transform(code), expected);
  });

  it('should trim code between "trim-below" and "trim-above "markers', () => {
    const code = `
function Tips() {
  return 321;
}
// comment-1
// trim-below
function someTips() {
  return 2222;
}
// comment-3
function printTips() {
  return 123;
}
// trim-above
// comment-4
`;

    const expected = `
function Tips() {
  return 321;
}
// comment-1

// comment-4`;

    assert.strictEqual(transform(code), expected);
  });

  it('should trim code between "trim-below" and "trim-above "markers if "trim-below" marker at the top ', () => {
    const code = `//trim-below
function Tips() {
  return 321;
}
// comment-1
/* comment-2 */
// comment-3
function printTips() {
  return 123;
}
// trim-above
// comment-4
function someTips() {
  return 2222;
}
`;

    const expected = `
// comment-4
function someTips() {
  return 2222;
}`;

    assert.strictEqual(transform(code), expected);
  });

  it('should trim code between "trim-below" and "trim-above "markers if "trim-above" marker at the bottom ', () => {
    const code = `
function Tips() {
  return 321;
}
// comment-1
//trim-below
function someTips() {
  return 2222;
}
// comment-3
function printTips() {
  return 123;
}
// comment-4
//trim-above
`;

    const expected = `
function Tips() {
  return 321;
}
// comment-1`;

    assert.strictEqual(transform(code), expected);
  });
  it('should trim code between "trim-below" and "trim-above "markers if markers in only trailing ', () => {
    const code = `
function Tips() {
  return 321;
}
// comment-1
function someTips() {
  return 2222;
}
// comment-3
function printTips() {
  return 123;
}
//trim-below
// comment-4
//trim-above
`;

    const expected = `
function Tips() {
  return 321;
}
// comment-1
function someTips() {
  return 2222;
}
// comment-3
function printTips() {
  return 123;
}`;

    assert.strictEqual(transform(code), expected);
  });
});
