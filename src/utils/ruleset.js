// Extract the root ruleset
function extractRoot(rules) {
  var [_, root] = Object.entries(rules).find(([_, v]) => v.parentId == null);
  return root;
}

// Child visitor that returns a new child with its id and parentId removed
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

// Transforms ruleset to the format that can be consumed by the arbiter gem
export function transformRuleset(ruleset) {
  const { actions, rules } = ruleset;

  const root = extractRoot(rules);
  const acc = { [root.condition]: root.children };
  processChild(root.id, rules);
  return acc;
}
