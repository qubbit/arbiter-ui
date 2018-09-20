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

const one = uniqueId();

const INITIAL_STATE = {
  rules: {
    [one]: {
      id: one,
      parentId: null,
      children: [],
      condition: 'and',
    },
  },
  actions: [],
};

export function addRule(parentId) {
  const id = uniqueId();

  return dispatch =>
    dispatch({
      type: ADD_RULE,
      data: {
        id,
        parentId,
        rule: { id, fact: null, operator: null, value: null },
      },
    });
}

export function addRuleGroup(parentId) {
  const id = uniqueId();

  return dispatch =>
    dispatch({
      type: ADD_RULE_GROUP,
      data: {
        id,
        parentId,
        rule: { id, condition: 'and', children: [] },
      },
    });
}

export function updateRule(id, object) {
  return dispatch =>
    dispatch({
      type: UPDATE_RULE,
      data: {
        id,
        object,
      },
    });
}

export function updateRuleGroup(id, object) {
  return dispatch =>
    dispatch({
      type: UPDATE_RULE_GROUP,
      data: {
        id,
        object,
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
  const id = action.data && action.data.id;
  const parentId = action.data && action.data.parentId;

  switch (action.type) {
    case ADD_RULE:
    case ADD_RULE_GROUP:
      var parent = state.rules[parentId];
      return {
        ...state,
        rules: {
          ...state.rules,
          [parentId]: {
            ...parent,
            children: [...parent.children, id],
          },
          [id]: { ...action.data.rule, parentId },
        },
      };
    case REMOVE_RULE:
    case REMOVE_RULE_GROUP:
      const newRuleset = omit(state.rules, id);
      const newChildren = state.rules[parentId].children.filter(x => x !== id);
      return {
        ...state,
        rules: {
          ...newRuleset,
          [parentId]: {
            ...state.rules[parentId],
            children: [...newChildren],
          },
        },
      };
    case UPDATE_RULE_GROUP:
    case UPDATE_RULE:
      var { object } = action.data;
      return {
        ...state,
        rules: {
          ...state.rules,
          [id]: { ...state.rules[id], ...object },
        },
      };
    case CALL_VALIDATION_API_SUCCESS:
      return { ...state, validationResult: action.response };
    case CALL_VALIDATION_API_FAILURE:
      return { ...state, validationResult: action.error };
    default:
      return state;
  }
};
