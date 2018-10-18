import {
  FETCH_RULESETS_SUCCESS,
  FETCH_RULESETS_FAILURE,
  FETCH_RULESETS_REQUEST
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
      return { ...state, rulesets: action.response };
    default:
      return state;
  }
};
