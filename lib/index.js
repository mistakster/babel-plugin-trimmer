const MARKERDOWN = 'trim-below';
const MARKERUP = 'trim-above';

function isFlaggedDown(comments) {
  return comments ? comments.some(c => c.value.indexOf(MARKERDOWN) >= 0) : false;
}
function isFlaggedUp(comments) {
  return comments ? comments.some(c => c.value.indexOf(MARKERUP) >= 0) : false;
}




module.exports = function babelPluginTrimmer() {
  return {
    visitor: {
      Program(root) {
        root.traverse({
          enter(path) {
            const node = path.node;

            if (isFlaggedDown(node.leadingComments)) {
              path.parent.body = path.parent.body.slice(0, path.parent.body.indexOf(node));
            }
            if (isFlaggedUp(node.leadingComments)) {
              path.parent.body = path.parent.body.slice(path.parent.body.indexOf(node), path.parent.body.length);
            }
          }
        });
      }
    }
  };
};
