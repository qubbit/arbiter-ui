import * as schema from './schema';
import { reducer } from './ruleset';
import action from '../actions/ruleset.js';

export const reducers = {
  schema: schema.reducer,
  ruleset: reducer
};

export const actions = {
  schema: schema.actions,
  ruleset: action
};
