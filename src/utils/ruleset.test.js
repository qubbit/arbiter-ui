import * as ruleset from './ruleset';
import r from './ruleset3.json';

describe('.transformRuleset', () => {
  it('finds correct rule in an ruleset', () => {
    var x = ruleset.transformRuleset(r);
    console.log(JSON.stringify(x, null, 2));
  });
});
