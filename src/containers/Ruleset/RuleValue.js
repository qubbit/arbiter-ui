import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { SelectField, TextField } from 'redux-form-antd';
import * as rulesEngine from 'store/rulesEngine';

class RuleValue extends React.Component {
  render() {
    const { rulesEngine, rule } = this.props;
    const { facts, selectedFact, values, selectedValues } = rulesEngine;
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
  return { rulesEngine: state.rulesEngine };
};

const mapDispatchToProps = {
  ...rulesEngine.actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(RuleValue);
