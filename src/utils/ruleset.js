export function findRule(ruleset, ruleId) {
  if (!ruleset) return null;
  if (ruleset.id === ruleId) {
    return ruleset;
  } else if (Array.isArray(ruleset.rules)) {
    for (const rule of ruleset.rules) {
      const subRule = findRule(rule, ruleId);
      if (subRule) return subRule;
    }
  }
  return null;
}

export function findRuleParent(ruleset, ruleId) {
  if (!ruleset) return null;
  if (ruleset.id === ruleId) {
    return ruleset;
  } else {
    for (const rule of ruleset.rules) {
      return findRule(rule, ruleId);
    }
  }
}

export function rmRule(ruleset, ruleId) {
  const index = ruleset.rules.findIndex(r => r.id == ruleId);

  if (ruleset.id === ruleId) {
    ruleset = null;
    return;
  } else {
    for (const rule of ruleset.rules) {
      return rmRule(rule, ruleId);
    }
  }
}

export function findGroup(ruleset, groupId) {
  if (!ruleset) return null;
  if (ruleset.id === groupId) return ruleset;
  return findGroup(ruleset.rules, groupId);
}
