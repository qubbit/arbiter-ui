import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { SelectField, TextField, TextAreaField } from 'redux-form-antd';
import Rules from './Rules';
import { Collapse, Form, Button, Radio, Select } from 'antd';
import { ARadioGroup, ASelect, ASwitch } from '../../components/Elements';
import * as rulesEngine from 'store/rulesEngine';

const { Option } = Select;
const { Panel } = Collapse;

class RulesetForm extends React.Component {
  handleActionChange = action => {
    this.props.changeAction(action);
  };

  handleTestRuleset = () => {
    this.props.testRuleset({});
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
        <div className="col">
          <Form onSubmit={handleSubmit}>
            <FieldArray name="rules" component={Rules} />
            <Collapse bordered={false} defaultActiveKey={['1']}>
              <Panel header="Test Payload" key="test-payload-panel">
                <Field
                  component={TextAreaField}
                  name="test_payload"
                  hasFeedback={false}
                  style={{ fontFamily: 'SF Mono' }}
                />
              </Panel>
            </Collapse>
            <div>
              <Field
                name="action"
                label="Action"
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

            {selectedAction &&
              actions[selectedAction].params.length > 0 && (
                <div>
                  {actions[selectedAction].params.map(p => (
                    <Field
                      label={p.name}
                      name={`params.${p.name}`}
                      component={TextField}
                      hasFeedback={false}
                    />
                  ))}
                </div>
              )}

            <div>
              <Field
                label="Description"
                name="description"
                component={TextAreaField}
                hasFeedback={false}
              />
            </div>
          </Form>
        </div>
        {/* Toolbar column */}
        <div className="col">
          <Field
            name="logical_operator"
            component={ARadioGroup}
            value="male"
            label="Logical Operator"
          >
            <Radio value="all">All</Radio>
            <Radio value="any">Any</Radio>
          </Field>
          <Field
            component={ASwitch}
            size="small"
            name="active"
            label="Active"
          />
          <div className="toolbar toolbar-vertical">
            <Button
              type="danger"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear
            </Button>
            <Button
              type="secondary"
              icon="api"
              disabled={pristine || submitting}
              onClick={this.handleTestRuleset}
            >
              Test Ruleset
            </Button>
            <Button
              type="primary"
              icon="save"
              disabled={pristine || submitting}
            >
              Create Ruleset
            </Button>
          </div>
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

RulesetForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RulesetForm);

export default reduxForm({
  form: 'rulesetForm', // a unique identifier for this form
})(RulesetForm);
