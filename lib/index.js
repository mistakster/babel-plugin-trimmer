

const MARKER_TRIM_BELOW = /^\s*trim-below\s*$/;
const MARKER_TRIM_ABOVE = /^\s*trim-above\s*$/;

function findMarker(comments, marker) {
  return comments ? comments.findIndex(c => marker.test(c.value)) : -1;
}

function isFlaggedToTrimBelow(comments) {
  return findMarker(comments, MARKER_TRIM_BELOW) >= 0;
}

function isFlaggedToTrimAbove(comments) {
  return findMarker(comments, MARKER_TRIM_ABOVE) >= 0;
}

module.exports = function babelPluginTrimmer(babel) {
  const t = babel.types;

  function findMarkerAboveInSiblings(path) {
    for (let i = 0; ; i += 1) {
      const nextSibling = path.getSibling(path.key + i);
      const node = nextSibling.node;
      const parentBody = path.parent.body;

      if (!node) {
        break;
      }

      if (isFlaggedToTrimAbove(node.trailingComments)) {
        const nodePosition = parentBody.indexOf(node);
        const markerPosition = findMarker(node.trailingComments, MARKER_TRIM_ABOVE);
        const emptyNode = t.noop();

        emptyNode.trailingComments = node.trailingComments.splice(markerPosition + 1);
        parentBody.push(emptyNode);

        return nodePosition;
      }
    }

    return -1;
  }

  return {
    visitor: {
      Program(root) {
        root.traverse({
          exit(path) {
            const node = path.node;
            const parentBody = path.parent.body;

            if (isFlaggedToTrimBelow(node.leadingComments)) {
              const nodePosition = parentBody.indexOf(node);

              const aboveMarkerPosition = findMarkerAboveInSiblings(path);
              const markerPosition = findMarker(node.leadingComments, MARKER_TRIM_BELOW);
              const emptyNode = t.noop();

              emptyNode.trailingComments = node.leadingComments.splice(0, markerPosition);

              const cutLength = aboveMarkerPosition >= 0 ? aboveMarkerPosition : parentBody.length;
              parentBody.splice(nodePosition, cutLength, emptyNode);
            }

            if (isFlaggedToTrimBelow(node.trailingComments)) {
              const markerPosition = findMarker(node.trailingComments, MARKER_TRIM_BELOW);

              node.trailingComments.splice(markerPosition);
            }

            if (isFlaggedToTrimAbove(node.leadingComments)) {
              const markerPosition = findMarker(node.leadingComments, MARKER_TRIM_ABOVE);

              node.leadingComments.splice(0, markerPosition + 1);
            }

            if (isFlaggedToTrimAbove(node.trailingComments)) {
              const nodePosition = parentBody.indexOf(node);
              const markerPosition = findMarker(node.trailingComments, MARKER_TRIM_ABOVE);
              const emptyNode = t.noop();

              emptyNode.trailingComments = node.trailingComments.splice(markerPosition + 1);
              parentBody.splice(0, nodePosition + 1);
              parentBody.push(emptyNode);
            }
          }
        });
      }
    }
  };
};
