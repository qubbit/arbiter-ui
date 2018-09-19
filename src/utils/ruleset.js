export function transformRuleset(ruleset) {
  const { actions, rules } = ruleset;

  var parent = Object.entries(rules).filter(([_, v]) => v.parentId == null);
  console.log(parent);

  function processChild(id) {
    // console.log(`processChild(${id})`);

    var children = rules[id].children;
    if (children && children.length) {
      for (var c of children) {
        return { [rules[id].condition]: processChild(c) };
      }
    }
    return rules[id];
  }

  const accumulator = {};
  Object.keys(rules).forEach(key => {
    accumulator[key] = processChild(key);
  });

  return accumulator;
}
