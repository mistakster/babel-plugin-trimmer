var MARKER = 'trim-below';

function isFlagged(comments) {
	var result = false;

	if (comments) {
		result = comments.some(function (c) {
			return c.value.indexOf(MARKER) >= 0;
		});
	}

	return result;
}

module.exports = function (_ref) {
	var t = _ref.types;

	return {
		visitor: {
			Program(path, state) {
				path.traverse({
					enter(path) {
						var node = path.node;

						if (isFlagged(node.leadingComments)) {
							path.parent.body = path.parent.body.slice(0, path.parent.body.indexOf(node));
						}
					}
				});
			}
		}
	};
};
