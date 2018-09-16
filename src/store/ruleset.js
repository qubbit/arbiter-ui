import api from '../utils/api.js';
import * as ruleset from '../utils/ruleset.js';
import uuid from 'uuid';

const initialState = {
  ruleset: { id: uuid(), rules: [], condition: 'and' },
  actions: [],
};

// Add new rule
export function addRule(groupId) {
  return dispatch =>
    dispatch({
      type: 'ADD_RULE',
      data: {
        groupId,
        rule: { id: uuid(), fact: null, operator: null, value: null },
      },
    });
}

export function addRuleGroup(groupId) {
  return dispatch =>
    dispatch({
      type: 'ADD_RULE_GROUP',
      data: { groupId, rules: { id: uuid(), condition: 'and', rules: [] } },
    });
}

export function removeRule(ruleId) {
  return dispatch => dispatch({ type: 'REMOVE_RULE', data: { ruleId } });
}

export function removeRuleGroup(ruleGroup) {
  return dispatch => dispatch({ type: 'REMOVE_RULE_GROUP', ruleGroup });
}

export function testRuleset(data) {
  return dispatch =>
    api
      .post('/validate_rules', data)
      .then(response => {
        dispatch({ type: 'CALL_VALIDATION_API_SUCCESS', response });
      })
      .catch(error => {
        dispatch({ type: 'CALL_VALIDATION_API_FAILURE', error });
      });
}

export const actions = {
  addRule,
  addRuleGroup,
  removeRule,
  removeRuleGroup,
  testRuleset,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_RULE':
      const group = ruleset.findGroup(state.ruleset, action.data.groupId);
      return {
        ...state,
        ruleset: {
          ...state.ruleset,
          rules: [...state.ruleset.rules, action.data.rule],
        },
      };
    case 'ADD_RULE_GROUP':
      const g = ruleset.findGroup(state.ruleset, action.data.groupId);
      return {
        ...state,
        ruleset: {
          ...state.ruleset,
          rules: [...state.ruleset.rules, action.data.rules],
        },
      };
    case 'REMOVE_RULE':
      const ruleId = action.data.ruleId;
      const rule = ruleset.rmRule(state.ruleset, ruleId);

      return {
        ...state,
      };
    case 'CALL_VALIDATION_API_SUCCESS':
      return { ...state, validationResult: action.response };
    case 'CALL_VALIDATION_API_FAILURE':
      return { ...state, validationResult: action.error };
    default:
      return state;
  }
};
