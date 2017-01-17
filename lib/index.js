const MARKER_TRIM_BELOW = 'trim-below';
const MARKER_TRIM_ABOVE = 'trim-above';

function isFlaggedToTrimBelow(leadingComments, trailingComments) {
  const hasLeading = leadingComments ? leadingComments.some(c => c.value.indexOf(MARKER_TRIM_BELOW) >= 0) : false;
  const hasTrailing = trailingComments ? trailingComments.some(c => c.value.indexOf(MARKER_TRIM_BELOW) >= 0) : false;

  return hasLeading || hasTrailing;
}
function isFlaggedToTrimAbove(leadingComments, trailingComments) {
  const hasLeading = leadingComments ? leadingComments.some(c => c.value.indexOf(MARKER_TRIM_ABOVE) >= 0) : false;
  const hasTrailing = trailingComments ? trailingComments.some(c => c.value.indexOf(MARKER_TRIM_ABOVE) >= 0) : false;

  return hasLeading || hasTrailing;
}

module.exports = function babelPluginTrimmer() {
  return {
    visitor: {
      Program(root) {
        root.traverse({
          exit(path) {
            const node = path.node;

            if (isFlaggedToTrimBelow(node.leadingComments)) {
              const pos = path.parent.body.indexOf(node);
              path.parent.body.splice(pos, path.parent.body.length);

              const posCommentsLeading = path.node.leadingComments;
              const posCommentsTrailing = path.node.trailingComments;
              console.log("\nBELOW lead\n");
              console.log(posCommentsLeading);
              console.log("\nBELOW trail\n");
              console.log(posCommentsTrailing);
              posCommentsLeading.forEach(function (item) {
                const commentIndex = item.value.indexOf(MARKER_TRIM_BELOW);
                if (commentIndex >= 0) {
                  posCommentsLeading.splice(0, commentIndex)
                }
              });
            }

            if (isFlaggedToTrimAbove(node.leadingComments)) {
              const pos = path.parent.body.indexOf(node);
              path.parent.body.splice(0, pos);

              const posCommentsLeading = path.node.leadingComments;
              const posCommentsTrailing = path.node.trailingComments;
              console.log("\nABOVE lead\n");
              console.log(posCommentsLeading);
              console.log("\nABOVE trail\n");
              console.log(posCommentsTrailing);
              posCommentsTrailing.forEach(function (item) {
                const commentIndex = item.value.indexOf(MARKER_TRIM_ABOVE);
                if (commentIndex >= 0) {
                  posCommentsTrailing.splice(0, commentIndex + 1)
                }
              });
            }
          }
        });
      }
    }
  };
};
