import * as ruleset from './ruleset';

const emptyRuleset = {
  id: '1',
  condition: 'and',
  rules: [],
};

const linearRuleset = {
  id: '1',
  condition: 'and',
  rules: [
    { id: '2', operator: 'in', value: [], fact: 'age' },
    { id: '3', operator: 'eq', value: 'Gopal', fact: 'name' },
    { id: '4', operator: 'not_eq', value: 'Columbus', fact: 'city' },
    { id: '5', operator: 'matches', value: /x@y.com/, fact: 'email' },
  ],
};

const nestedRuleset = {
  id: '1',
  condition: 'and',
  rules: [
    { id: '2', operator: 'in', value: [], fact: 'age' },
    { id: '3', operator: 'eq', value: 'Gopal', fact: 'name' },
    { id: '4', operator: 'not_eq', value: 'Columbus', fact: 'city' },
    { id: '5', operator: 'matches', value: /x@y.com/, fact: 'email' },
    {
      id: '6',
      condition: 'or',
      rules: [
        { id: '7', operator: 'in', value: [], fact: 'age' },
        { id: '8', operator: 'eq', value: 'Gopal', fact: 'name' },
        { id: '9', operator: 'not_eq', value: 'Columbus', fact: 'city' },
        { id: '10', operator: 'matches', value: /x@y.com/, fact: 'email' },
      ],
    },
  ],
};

const nestedNestedRuleset = {
  id: '1',
  condition: 'and',
  rules: [
    { id: '2', operator: 'in', value: [], fact: 'age' },
    { id: '3', operator: 'eq', value: 'Gopal', fact: 'name' },
    { id: '4', operator: 'not_eq', value: 'Columbus', fact: 'city' },
    { id: '5', operator: 'matches', value: /x@y.com/, fact: 'email' },
    {
      id: '6',
      condition: 'or',
      rules: [
        { id: '7', operator: 'in', value: [], fact: 'age' },
        { id: '8', operator: 'eq', value: 'Gopal', fact: 'name' },
        { id: '9', operator: 'not_eq', value: 'Columbus', fact: 'city' },
        { id: '10', operator: 'matches', value: /x@y.com/, fact: 'email' },
        {
          id: '11',
          condition: 'or',
          rules: [
            { id: '12', operator: 'in', value: [], fact: 'age' },
            { id: '13', operator: 'eq', value: 'Gopal', fact: 'name' },
            { id: '14', operator: 'not_eq', value: 'Columbus', fact: 'city' },
            { id: '15', operator: 'matches', value: /x@y.com/, fact: 'email' },
          ],
        },
      ],
    },
  ],
};

describe('.findRule', () => {
  it('finds correct rule in an ruleset', () => {
    const rule = ruleset.findRule(emptyRuleset, '2');
    expect(rule).toBe(null);
  });

  it('finds correct rule in a non-nested ruleset', () => {
    const rule = ruleset.findRule(linearRuleset, '2');
    expect(rule).toEqual({ id: '2', operator: 'in', value: [], fact: 'age' });
  });

  it('returns null if rule is not found in a non-nested ruleset', () => {
    const rule = ruleset.findRule(linearRuleset, '99');
    debugger;
    expect(rule).toBe(null);
  });

  it('finds correct rule in a nested ruleset', () => {
    const rule2 = ruleset.findRule(nestedRuleset, '2');
    expect(rule2).toEqual({ id: '2', operator: 'in', value: [], fact: 'age' });

    const rule7 = ruleset.findRule(nestedRuleset, '7');
    expect(rule7).toEqual({ id: '7', operator: 'in', value: [], fact: 'age' });

    const rule2Again = ruleset.findRule(nestedNestedRuleset, '2');
    expect(rule2Again).toEqual({
      id: '2',
      operator: 'in',
      value: [],
      fact: 'age',
    });

    const rule7Again = ruleset.findRule(nestedNestedRuleset, '7');
    expect(rule7Again).toEqual({
      id: '7',
      operator: 'in',
      value: [],
      fact: 'age',
    });

    const rule12 = ruleset.findRule(nestedNestedRuleset, '12');
    expect(rule12).toEqual({
      id: '12',
      operator: 'in',
      value: [],
      fact: 'age',
    });
  });
});
