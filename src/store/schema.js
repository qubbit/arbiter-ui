export const OPERATORS = [
  { label: 'in', value: 'in' },
  { label: 'not in', value: 'not_in' },
  { label: 'matches', value: 'matches' },
  { label: '=', value: 'eq' },
  { label: '\u2260', value: 'not_eq' },
  { label: '<', value: 'lt' },
  { label: '\u2264', value: 'lte' },
  { label: '>', value: 'gt' },
  { label: '\u2265', value: 'gte' }
];

export const FACTS = [
  {
    name: 'epa_type',
    label: 'EPA Type',
    type: 'string',
    allowMultiple: true,
    required: true
  },
  {
    name: 'reason_code',
    label: 'Reason Code',
    type: 'string',
    allowMultiple: true
  },
  { name: 'note', label: 'PA Note', type: 'string', allowMultiple: false }
];

// These are the list of available actions for this rule engine
export const ACTIONS = {
  convert_to_fax: {
    label: 'Convert to fax',
    params: []
  },
  request_log: {
    label: 'Add a log entry',
    params: [
      { name: 'message', type: 'string' },
      { name: 'name', type: 'string' }
    ]
  },
  add_error_section: {
    label: 'Add an error section',
    params: [
      { name: 'description', type: 'string' },
      { name: 'recommend_epa_form_change', type: 'string' }
    ]
  },
  close_pa: { label: 'Close PA with a fail touch', params: [] },
  set_user_retryable: {
    label: 'Make PA user-retryable',
    params: [{ name: 'message', type: 'string' }]
  },
  augment_pa_note: {
    label: 'Augment PA Note',
    params: [{ name: 'message', type: 'string' }]
  }
};

// A ruleset can be stored in a database, how do we want to key that ruleset?
// For this purpose we will choose one of the facts

// TODO: Make it possible to download this schema from the server on app load
const initialState = {
  name: 'Response Modifier',
  config: { findBy: 'epa_type' },
  keysExcludedFromPreview: ['id', 'parentId', 'type'],
  operators: [...OPERATORS],
  facts: [...FACTS],
  actions: { ...ACTIONS }
};

export const actions = {};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
