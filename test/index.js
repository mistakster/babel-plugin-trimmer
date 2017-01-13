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

const result = require('babel-core').transform(code, {
  plugins: [
    '../lib/index.js'
  ]
});

console.log(result.code);
