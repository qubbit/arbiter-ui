import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import Rules from './Rules';
import { Button, Radio, Select } from 'antd';
import {
  ARadioGroup,
  ASelect,
  AInput,
  ATextarea,
  ASwitch,
} from '../../components/Elements';
import * as rulesEngine from 'store/rulesEngine';

const { Option } = Select;

class RulesetForm extends React.Component {
  handleActionChange = action => {
    this.props.changeAction(action);
  };

  render() {
    const {
      rulesEngine,
      handleSubmit,
      pristine,
      reset,
      submitting,
    } = this.props;

    const { actions, selectedAction } = rulesEngine;

    return (
      <div className="form-container col">
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Logical Operator</label>
              <div>
                <Field
                  name="logical_operator"
                  component={ARadioGroup}
                  value="male"
                >
                  <Radio value="all">All</Radio>
                  <Radio value="any">Any</Radio>
                </Field>
              </div>
            </div>

            <FieldArray name="rules" component={Rules} />

            <div>
              <label>then</label>
              <div>
                <Field
                  name="action"
                  component={ASelect}
                  onSelect={this.handleActionChange}
                >
                  {Object.keys(actions).map(a => (
                    <Option key={`action-${a}`} value={a}>
                      {actions[a].label}
                    </Option>
                  ))}
                </Field>
              </div>
            </div>

            {selectedAction &&
              actions[selectedAction].params.length > 0 && (
                <div>
                  <label>with</label>
                  {actions[selectedAction].params.map(p => (
                    <div>
                      <label>{p.name}</label>
                      <Field name={`params.${p.name}`} component={AInput} />
                    </div>
                  ))}
                </div>
              )}

            <div>
              <label>Description</label>
              <div>
                <Field name="description" component={ATextarea} />
              </div>
            </div>
            <div>
              <label>Active</label>
              <Field component={ASwitch} name="active" />
            </div>
            <div className="toolbar">
              <Button
                type="danger"
                size="large"
                disabled={pristine || submitting}
                onClick={reset}
              >
                Clear
              </Button>
              <Button
                type="secondary"
                size="large"
                icon="api"
                disabled={pristine || submitting}
              >
                Test Ruleset
              </Button>
              <Button
                type="primary"
                size="large"
                icon="save"
                disabled={pristine || submitting}
              >
                Create Ruleset
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { rulesEngine: state.rulesEngine };
};

const mapDispatchToProps = {
  ...rulesEngine.actions,
};

RulesetForm = connect(mapStateToProps, mapDispatchToProps)(RulesetForm);

export default reduxForm({
  form: 'rulesetForm', // a unique identifier for this form
})(RulesetForm);
