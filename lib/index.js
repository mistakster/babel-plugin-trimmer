"use strict";

const MARKER_TRIM_BELOW = /^\s*trim-below\s*$/;
const MARKER_TRIM_ABOVE = /^\s*trim-above\s*$/;

function findMarker(comments, marker) {
  return comments ? comments.findIndex(c => marker.test(c.value)) : -1;
}

function isFlaggedToTrimBelow(leadingComments, trailingComments) {
  const hasLeading = findMarker(leadingComments, MARKER_TRIM_BELOW) >= 0;
  const hasTrailing = findMarker(trailingComments, MARKER_TRIM_BELOW) >= 0;

  return hasLeading || hasTrailing;
}

function isFlaggedToTrimAbove(leadingComments, trailingComments) {
  const hasLeading = findMarker(leadingComments, MARKER_TRIM_ABOVE) >= 0;
  const hasTrailing = findMarker(trailingComments, MARKER_TRIM_ABOVE) >= 0;

  return hasLeading || hasTrailing;
}

module.exports = function babelPluginTrimmer() {
  return {
    visitor: {
      Program(root) {
        root.traverse({
          exit(path) {
            const node = path.node;
            const parentBody = path.parent.body;

            if (isFlaggedToTrimBelow(node.leadingComments, null)) {
              const nodePosition = parentBody.indexOf(node);

              parentBody.splice(nodePosition);
            }

            if (isFlaggedToTrimBelow(null, node.trailingComments)) {
              const markerPosition = findMarker(node.trailingComments, MARKER_TRIM_BELOW);

              node.trailingComments.splice(markerPosition);
            }

            if (isFlaggedToTrimAbove(node.leadingComments, null)) {
              const markerPosition = findMarker(node.leadingComments, MARKER_TRIM_ABOVE);

              node.leadingComments.splice(0, markerPosition + 1);
            }

            if (isFlaggedToTrimAbove(null, node.trailingComments)) {
              const nodePosition = parentBody.indexOf(node);

              parentBody.splice(0, nodePosition + 1);
            }

          }
        });
      }
    }
  };
};
