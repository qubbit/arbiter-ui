import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { SelectField, TextField } from 'redux-form-antd';
import * as schema from 'store/schema';

class RuleValue extends React.Component {
  render() {
    const { schema, rule } = this.props;
    const { facts, selectedFact, values, selectedValues } = schema;
    const factObject = facts.find(f => f.name === selectedFact);

    if (typeof selectedValues === 'string') {
      return (
        <Field
          name={`${rule}.value`}
          hasFeedback={false}
          component={TextField}
        />
      );
    } else if (
      typeof selectedValues === 'object' &&
      selectedValues.length === 0
    ) {
      return (
        <Field
          hasFeedback={false}
          name={`${rule}.value`}
          component={TextField}
        />
      );
    }

    let options = values[selectedFact].map(x => ({
      label: x,
      value: x,
    }));

    options = options.length
      ? options
      : [{ label: 'Select', value: 'Something' }];
    let selectionMode = 'default';

    if (factObject && factObject.allowMultiple) {
      selectionMode = 'multiple';
    }

    return (
      <Field
        name={`${rule}.value`}
        component={SelectField}
        options={options}
        hasFeedback={false}
        mode={selectionMode}
      />
    );
  }
}

const mapStateToProps = state => {
  return { schema: state.schema };
};

const mapDispatchToProps = {
  ...schema.actions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RuleValue);
