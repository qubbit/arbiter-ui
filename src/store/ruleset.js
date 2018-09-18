import api from '../utils/api.js';
import * as ruleset from '../utils/ruleset.js';
import uuid from 'uuid';
import omit from 'lodash/omit';

const initialId = uuid();

const initialState = {
  ruleset: { [initialId]: { id: initialId, children: [], condition: 'and' } },
  actions: [],
};

// Add new rule
export function addRule(parentId) {
  return dispatch =>
    dispatch({
      type: 'ADD_RULE',
      data: {
        parentId,
        rule: { id: uuid(), fact: null, operator: null, value: null },
      },
    });
}

export function addRuleGroup(parentId) {
  return dispatch =>
    dispatch({
      type: 'ADD_RULE_GROUP',
      data: { parentId, rules: { id: uuid(), condition: 'and', children: [] } },
    });
}

export function removeRule(parentId, ruleId) {
  return dispatch =>
    dispatch({ type: 'REMOVE_RULE', data: { parentId, ruleId } });
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
      var parentId = action.data.parentId;
      var ruleId = action.data.rule.id;
      var group = state.ruleset[parentId];
      return {
        ...state,
        ruleset: {
          ...state.ruleset,
          [parentId]: {
            ...group,
            children: [...state.ruleset[parentId].children, ruleId],
          },
          [ruleId]: { ...action.data.rule, parentId },
        },
      };
    case 'ADD_RULE_GROUP':
      var parentId = action.data.parentId;
      var parent = state.ruleset[parentId];

      return {
        ...state,
        ruleset: {
          ...state.ruleset,
          [parentId]: {
            ...parent,
            children: [...parent.children, action.data.rules.id],
          },
          [action.data.rules.id]: { ...action.data.rules },
        },
      };
    case 'REMOVE_RULE':
      const { ruleId, parentId } = action.data;
      const newRuleset = omit(state.ruleset, ruleId);
      const newChildren = state.ruleset[parentId].children.filter(
        x => x != ruleId,
      );
      return {
        ...state,
        ruleset: {
          ...newRuleset,
          [parentId]: {
            ...state.ruleset[parentId],
            children: [...newChildren],
          },
        },
      };
    case 'REMOVE_RULE_GROUP':
      const { rId, pId } = action.data;
      const nr = omit(state.ruleset, rId);
      const nc = state.ruleset[pId].children.filter(x => x != rId);
      return {
        ...state,
        ruleset: {
          ...nr,
          [pId]: {
            ...state.ruleset[pId],
            children: [...nc],
          },
        },
      };
    case 'CALL_VALIDATION_API_SUCCESS':
      return { ...state, validationResult: action.response };
    case 'CALL_VALIDATION_API_FAILURE':
      return { ...state, validationResult: action.error };
    default:
      return state;
  }
};
