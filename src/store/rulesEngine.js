const initialState = {
  name: 'Response Modifiers',
  rules: [],
  facts: [
    { identifier: 'epa_type', label: 'EPA type' },
    { identifier: 'reason_code', label: 'reason code' },
    { identifier: 'note', label: 'PA note' },
  ],
  values: {
    epa_type: ['ESI', 'Anthem', 'Aetna'],
    reason_code: ['BY', 'BX', 'CD'],
  },
  selectedValues: [],
};

// initialState.remainingFacts = initialState.facts;

export function changeActiveFact(fact) {
  return dispatch => dispatch({ type: 'FACT_CHANGED', fact });
}

export const actions = {
  changeActiveFact,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FACT_CHANGED':
      const values = state.values[action.fact] || [];
      return { ...state, selectedValues: [...values] };
    default:
      return state;
  }
};
