import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import Rules from './Rules';
import { Button, Radio, Select } from 'antd';
import { ARadioGroup, ASelect, ATextarea } from '../../components/Elements';

const { Option } = Select;

class RulesetForm extends React.Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

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
                <Field name="action" component={ASelect} onChange={null}>
                  <Option value="coerce_to_fax">convert to fax</Option>
                  <Option value="fail_touch">add a fail touch</Option>
                </Field>
              </div>
            </div>
            <div>
              <label>Description</label>
              <div>
                <Field name="description" component={ATextarea} />
              </div>
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

RulesetForm = connect(mapStateToProps, null)(RulesetForm);

export default reduxForm({
  form: 'rulesetForm', // a unique identifier for this form
})(RulesetForm);
