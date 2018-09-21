import omit from 'lodash/omit';
import uniqueId from 'lodash/uniqueId';
import {
  ADD_RULE,
  ADD_RULE_GROUP,
  UPDATE_RULE,
  UPDATE_RULE_GROUP,
  REMOVE_RULE,
  REMOVE_RULE_GROUP,
  VALIDATE_SUCCESS,
  VALIDATE_FAILURE
} from '../actions/types.js';

const one = uniqueId();

const INITIAL_STATE = {
  rules: {
    [one]: {
      id: one,
      parentId: null,
      children: [],
      condition: 'all'
    }
  },
  test: { success: null, rules: {} },
  actions: []
};

const rules = (state, action) => {
  const id = action.data && action.data.id;
  const parentId = action.data && action.data.parentId;

  switch (action.type) {
    case ADD_RULE:
    case ADD_RULE_GROUP:
      var parent = state.rules[parentId];
      return {
        ...state.rules,
        [parentId]: {
          ...parent,
          children: [...parent.children, id]
        },
        [id]: { ...action.data.rule, parentId }
      };
    case REMOVE_RULE:
    case REMOVE_RULE_GROUP:
      const newRuleset = omit(state.rules, id);
      const newChildren = state.rules[parentId].children.filter(x => x !== id);
      return {
        ...newRuleset,
        [parentId]: {
          ...state.rules[parentId],
          children: [...newChildren]
        }
      };
    case UPDATE_RULE_GROUP:
    case UPDATE_RULE:
      var { object } = action.data;
      return {
        ...state.rules,
        [id]: { ...state.rules[id], ...object }
      };
    default:
      return state;
  }
};

export const reducer = (state = INITIAL_STATE, action) => {
  const { type } = action;

  if (type.match('RULE')) {
    return {
      ...state,
      rules: rules(state, action)
    };
  }

  if (type === VALIDATE_SUCCESS) {
    return { ...state, test: action.response };
  } else if (type === VALIDATE_FAILURE) {
    return { ...state };
  }

  return state;
};
