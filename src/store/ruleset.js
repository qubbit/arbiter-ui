import api from '../utils/api.js';
import omit from 'lodash/omit';
import uniqueId from 'lodash/uniqueId';
import {
  ADD_RULE,
  ADD_RULE_GROUP,
  REMOVE_RULE,
  REMOVE_RULE_GROUP,
  CALL_VALIDATION_API_SUCCESS,
  CALL_VALIDATION_API_FAILURE,
} from '../actions/types.js';

const initialId = uniqueId();

const INITIAL_STATE = {
  ruleset: { [initialId]: { id: initialId, children: [], condition: 'and' } },
  actions: [],
};

export function addRule(parentId) {
  return dispatch =>
    dispatch({
      type: ADD_RULE,
      data: {
        parentId,
        rule: { id: uniqueId(), fact: null, operator: null, value: null },
      },
    });
}

export function addRuleGroup(parentId) {
  return dispatch =>
    dispatch({
      type: ADD_RULE_GROUP,
      data: {
        parentId,
        rules: { id: uniqueId(), condition: 'and', children: [] },
      },
    });
}

export function removeRule(id, parentId) {
  return dispatch => dispatch({ type: REMOVE_RULE, data: { id, parentId } });
}

export function removeRuleGroup(id, parentId) {
  return dispatch =>
    dispatch({ type: REMOVE_RULE_GROUP, data: { id, parentId } });
}

export function testRuleset(data) {
  return dispatch =>
    api
      .post('/validate_rules', data)
      .then(response => {
        dispatch({ type: CALL_VALIDATION_API_SUCCESS, response });
      })
      .catch(error => {
        dispatch({ type: CALL_VALIDATION_API_FAILURE, error });
      });
}

export const actions = {
  addRule,
  addRuleGroup,
  removeRule,
  removeRuleGroup,
  testRuleset,
};

export const reducer = (state = INITIAL_STATE, action) => {
  const parentId = action.data && action.data.parentId;

  switch (action.type) {
    case ADD_RULE:
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
    case ADD_RULE_GROUP:
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
    case REMOVE_RULE:
      let { id } = action.data;
      const newRuleset = omit(state.ruleset, id);
      const newChildren = state.ruleset[parentId].children.filter(
        x => x !== id,
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
    case REMOVE_RULE_GROUP:
      var { id } = action.data;
      const updatedState = omit(state.ruleset, id);
      const updatedChildren = state.ruleset[parentId].children.filter(
        x => x !== id,
      );
      return {
        ...state,
        ruleset: {
          ...updatedState,
          [parentId]: {
            ...state.ruleset[parentId],
            children: [...updatedChildren],
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
