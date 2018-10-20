import api from '../utils/api.js';

import {
  FETCH_RULESETS_REQUEST,
  FETCH_RULESETS_SUCCESS,
  FETCH_RULESETS_FAILURE,
  TOGGLE_RULESET_ACTIVE_REQUEST,
  TOGGLE_RULESET_ACTIVE_SUCCESS
} from './types.js';

export function toggleRulesetActive({ ruleset_partner_mapping_id, active }) {
  return dispatch => {
    dispatch({ type: TOGGLE_RULESET_ACTIVE_REQUEST });
    return api
      .patch(`/ruleset_partner_mappings/${ruleset_partner_mapping_id}`, {
        is_active: active
      })
      .then(response => {
        dispatch({ type: TOGGLE_RULESET_ACTIVE_SUCCESS, response });
      });
  };
}

export function fetchRulesets() {
  return dispatch => {
    dispatch({ type: FETCH_RULESETS_REQUEST });
    return api.fetch('/ruleset_partner_mappings').then(response => {
      dispatch({ type: FETCH_RULESETS_SUCCESS, response });
    });
  };
}
