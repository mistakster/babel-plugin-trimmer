const MARKER = 'trim-below';

function isFlagged(comments) {
  return comments ? comments.some(c => c.value.indexOf(MARKER) >= 0) : false;
}

module.exports = function babelPluginTrimmer() {
  return {
    visitor: {
      Program(root) {
        root.traverse({
          enter(path) {
            const node = path.node;

            if (isFlagged(node.leadingComments)) {
              path.parent.body = path.parent.body.slice(0, path.parent.body.indexOf(node));
            }
          }
        });
      }
    }
  };
};
