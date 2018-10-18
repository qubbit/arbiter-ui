import api from '../utils/api.js';

import {
  FETCH_RULESETS_REQUEST,
  FETCH_RULESETS_SUCCESS,
  FETCH_RULESETS_FAILURE
} from './types.js';

export function fetchRulesets() {
  return dispatch => {
    dispatch({ type: FETCH_RULESETS_REQUEST });
    return api.fetch('/ruleset_partner_mappings').then(response => {
      dispatch({ type: FETCH_RULESETS_SUCCESS, response });
    });
  };
}
