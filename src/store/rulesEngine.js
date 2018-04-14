const initialState = {
  name: 'Response Modifier',
  rules: [],
  facts: [
    {
      name: 'epa_type',
      label: 'EPA type',
      type: 'string',
      allowMultiple: true,
    },
    {
      name: 'reason_code',
      label: 'reason code',
      type: 'string',
      allowMultiple: true,
    },
    { name: 'note', label: 'PA note', type: 'string', allowMultiple: false },
  ],
  actions: {
    convert_to_fax: {
      label: 'convert to fax',
      params: [{ name: 'message', type: 'string' }],
    },
    fail_touch: { label: 'add a fail touch', params: [] },
  },
  values: {
    epa_type: ['ESI', 'Anthem', 'Aetna'],
    reason_code: ['BY', 'BX', 'CD'],
  },
  selectedValues: [],
  selectedAction: '',
};

// initialState.remainingFacts = initialState.facts;

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
      const values = state.values[action.fact] || [];
      return { ...state, selectedValues: [...values] };
    case 'ACTION_CHANGED':
      return { ...state, selectedAction: action.action };
    default:
      return state;
  }
};
