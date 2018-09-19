function extractRoot(rules) {
  var [_, root] = Object.entries(rules).filter(
    ([_, v]) => v.parentId == null,
  )[0];
  return root;
}

// child visitor that returns a new child with id and parentId removed
function visitChild(child) {
  const { id, parentId, ...rest } = child;
  return rest;
}

function processChild(id, rules) {
  var parent = rules[id];
  if (!('children' in parent)) {
    return visitChild(parent);
  }

  var children = parent.children;
  for (var i = 0; i < children.length; i++) {
    children[i] = processChild(children[i], rules);
  }
  return { [parent.condition]: children };
}

export function transformRuleset(ruleset) {
  const { actions, rules } = ruleset;

  const root = extractRoot(rules);
  const acc = { [root.condition]: root.children };

  for (var i = 0; i < root.children.length; i++) {
    var id = root.children[i];
    root.children[i] = processChild(id, rules);
  }

  return acc;
}
