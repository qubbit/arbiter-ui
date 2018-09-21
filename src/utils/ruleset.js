import cloneDeep from 'lodash/cloneDeep';
import uniq from 'lodash/uniq';

// Extract the root ruleset
function extractRoot(rules) {
  var [, root] = Object.entries(rules).find(([_, v]) => v.parentId == null);
  return root;
}

function visitChild(child, callback) {
  if (callback) return callback(child);
  return child;
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
  const cloneObject = cloneDeep(ruleset);

  const { rules } = cloneObject;

  const root = extractRoot(rules);
  const acc = { [root.condition]: root.children };
  processChild(root.id, rules);
  return acc;
}

function facts(rules, id) {
  var kid = rules[id];
  if (!kid) return [];
  if (!kid.children) return [kid.fact];
  return kid.children.reduce((acc, childId) => {
    return [...acc, ...facts(rules, childId)];
  }, []);
}

export function uniqueFacts(ruleset) {
  const root = extractRoot(ruleset.rules);
  return uniq(facts(ruleset.rules, root.id));
}
