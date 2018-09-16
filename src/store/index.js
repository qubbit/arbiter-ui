import * as schema from './schema';
import * as ruleset from './ruleset';

export const reducers = {
  schema: schema.reducer,
  ruleset: ruleset.reducer,
};

export const actions = {
  schema: schema.actions,
  ruleset: ruleset.actions,
};
