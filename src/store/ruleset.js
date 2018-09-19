import api from '../utils/api.js';
import omit from 'lodash/omit';
import uniqueId from 'lodash/uniqueId';
import {
  ADD_RULE,
  ADD_RULE_GROUP,
  UPDATE_RULE,
  UPDATE_RULE_GROUP,
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

export function updateRule(rule) {
  return dispatch =>
    dispatch({
      type: UPDATE_RULE,
      data: {
        rule,
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

export function updateRuleGroup(ruleGroup) {
  return dispatch =>
    dispatch({
      type: UPDATE_RULE_GROUP,
      data: {
        ruleGroup,
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
  updateRule,
  updateRuleGroup,
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
    case UPDATE_RULE:
      const { rule } = action.data;
      return {
        ...state,
        ruleset: {
          ...state.ruleset,
          [rule.id]: { rule },
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
    case UPDATE_RULE_GROUP:
      var { ruleGroup } = action.data;

      return {
        ...state,
        ruleset: {
          ...state.ruleset,
          [ruleGroup.id]: { ...ruleGroup },
        },
      };
    case REMOVE_RULE:
    case REMOVE_RULE_GROUP:
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
    case 'CALL_VALIDATION_API_SUCCESS':
      return { ...state, validationResult: action.response };
    case 'CALL_VALIDATION_API_FAILURE':
      return { ...state, validationResult: action.error };
    default:
      return state;
  }
};
