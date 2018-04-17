// A ruleset can be stored in a database, how do we want to key that ruleset?
// For this purpose we will choose one of the facts

const initialState = {
  name: 'Response Modifier',
  config: { findBy: 'epa_type' },
  conditions: [
    { label: 'is one of', value: 'in' },
    { label: 'is equal to', value: 'eq' },
    { label: 'does not equal to', value: 'not_eq' },
    { label: 'is less than', value: 'lt' },
    { label: 'is less than or equal to', value: 'lte' },
    { label: 'is greater than', value: 'gt' },
    { label: 'is greater than or equal to', value: 'gte' },
  ],
  facts: [
    {
      name: 'epa_type',
      label: 'EPA Type',
      type: 'string',
      allowMultiple: true,
      required: true,
    },
    {
      name: 'reason_code',
      label: 'Reason Code',
      type: 'string',
      allowMultiple: true,
    },
    { name: 'note', label: 'PA Note', type: 'string', allowMultiple: false },
  ],
  actions: {
    convert_to_fax: {
      label: 'Convert to fax',
      params: [{ name: 'message', type: 'string' }],
    },
    fail_touch: { label: 'Add a fail touch', params: [] },
  },
  values: {
    epa_type: ['ESI', 'Anthem', 'Aetna'],
    reason_code: ['BY', 'BX', 'CD'],
    note: '',
  },
  selectedValues: [],
  selectedAction: '',
  selectedFact: '',
};

// ^ We may want to decouple selectedValues and selectedAction from the
// rules engine because that's the concern of the UI

export function changeFact(fact) {
  return dispatch => dispatch({ type: 'FACT_CHANGED', fact });
}

export function changeAction(action) {
  return dispatch => dispatch({ type: 'ACTION_CHANGED', action });
}

export const actions = {
  changeFact,
  changeAction,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FACT_CHANGED':
      const values = state.values[action.fact];
      return {
        ...state,
        selectedFact: action.fact,
        selectedValues: values,
      };
    case 'ACTION_CHANGED':
      return { ...state, selectedAction: action.action };
    default:
      return state;
  }
};
