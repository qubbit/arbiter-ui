import * as schema from './schema';
import { reducer } from './ruleset';
import { reducer as r2 } from './rulesets';
import * as rulesetActions from '../actions/ruleset.js';
import * as rulesetsActions from '../actions/rulesets.js';

export const reducers = {
  schema: schema.reducer,
  ruleset: reducer,
  rulesets: r2
};

export const actions = {
  schema: schema.actions,
  ruleset: rulesetActions,
  rulesets: rulesetsActions
};
