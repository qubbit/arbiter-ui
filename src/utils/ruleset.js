export function extractRoot(rules) {
  var [_, root] = Object.entries(rules).filter(
    ([_, v]) => v.parentId == null,
  )[0];
  return root;
}

export function processChild(id, rules) {
  console.log(`processChild(${id})`);

  if (!('children' in rules[id])) {
    return rules[id];
  }

  var children = rules[id].children;
  if (children.length) {
    for (var i = 0; i < children.length; i++) {
      children[i] = processChild(children[i], rules);
    }
    return { [rules[id].condition]: children };
  }
  return rules[id];
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
