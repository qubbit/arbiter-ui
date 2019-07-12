import {
  FETCH_RULESETS_REQUEST,
  FETCH_RULESETS_SUCCESS,
  TOGGLE_RULESET_ACTIVE_SUCCESS
} from '../actions/types.js';

const INITIAL_STATE = {
  rulesets: [],
  loading: false
};

export const reducer = (state = INITIAL_STATE, action) => {
  const { type } = action;
  switch (type) {
    case FETCH_RULESETS_REQUEST:
      return { ...state, loading: true };
    case FETCH_RULESETS_SUCCESS:
      return { ...state, rulesets: action.response, loading: false };
    case TOGGLE_RULESET_ACTIVE_SUCCESS:
      const updated = action.response;
      const updatedRulesets = state.rulesets.map(r =>
        r.id === updated.id ? updated : r
      );
      return { ...state, rulesets: [...updatedRulesets], loading: false };
    default:
      return state;
  }
};
