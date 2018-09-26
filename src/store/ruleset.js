import uniqueId from 'lodash/uniqueId';
import {
  RULE_OP_ADD_RULE,
  RULE_OP_ADD_RULE_GROUP,
  RULE_OP_UPDATE_RULE,
  RULE_OP_UPDATE_RULE_GROUP,
  RULE_OP_REMOVE_RULE,
  RULE_OP_REMOVE_RULE_GROUP,
  ADD_ACTION,
  UPDATE_ACTION,
  REMOVE_ACTION,
  REORDER_ACTIONS,
  TEST_RULESET_SUCCESS,
  TEST_RULESET_FAILURE
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

const decendants = (rules, id) => {
  var kid = rules[id];
  if (!(kid && kid.children)) return [];

  return kid.children.reduce(
    (acc, childId) => [...acc, childId, ...decendants(rules, childId)],
    []
  );
};

const deleteMany = (object, ids) => {
  object = { ...object };
  ids.forEach(id => delete object[id]);
  return object;
};

const rules = (state, action) => {
  const id = action.data && action.data.id;
  const parentId = action.data && action.data.parentId;

  switch (action.type) {
    case RULE_OP_ADD_RULE:
    case RULE_OP_ADD_RULE_GROUP:
      var parent = state.rules[parentId];
      return {
        ...state.rules,
        [parentId]: {
          ...parent,
          children: [...parent.children, id]
        },
        [id]: { ...action.data.rule, parentId }
      };
    case RULE_OP_REMOVE_RULE:
    case RULE_OP_REMOVE_RULE_GROUP:
      return {
        ...deleteMany(state.rules, [id, ...decendants(state.rules, id)]),
        [parentId]: {
          ...state.rules[parentId],
          children: state.rules[parentId].children.filter(x => x !== id)
        }
      };
    case RULE_OP_UPDATE_RULE_GROUP:
    case RULE_OP_UPDATE_RULE:
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

  if (type.match(/^RULE_OP/)) {
    return {
      ...state,
      rules: rules(state, action)
    };
  }

  if ([ADD_ACTION, UPDATE_ACTION].includes(type)) {
    return {
      ...state,
      actions: [
        ...state.actions,
        {
          ...action.data.details,
          name: action.data.name
        }
      ]
    };
  }

  if (type === REORDER_ACTIONS) {
    const { oldIndex, newIndex } = action.data;
    const a = oldIndex > newIndex ? newIndex : oldIndex;
    const b = oldIndex > newIndex ? oldIndex : newIndex;

    return {
      ...state,
      actions: [
        ...state.actions.slice(0, a),
        state.actions[b],
        ...state.actions.slice(a + 1, b),
        state.actions[a],
        ...state.actions.slice(b + 1)
      ]
    };
  }

  if (type === REMOVE_ACTION) {
    const filtered = state.actions.filter(a => a.name !== action.data.action);
    debugger;
    return {
      ...state,
      actions: [...filtered]
    };
  }

  if (type === TEST_RULESET_SUCCESS) {
    return { ...state, test: action.response };
  } else if (type === TEST_RULESET_FAILURE) {
    const errorSlice = (({ error, exception, status }) => ({
      error,
      exception,
      status
    }))(action.error);

    return {
      ...state,
      test: {
        success: null,
        rules: [],
        response: JSON.stringify(errorSlice, null, 2)
      }
    };
  }

  return state;
};
