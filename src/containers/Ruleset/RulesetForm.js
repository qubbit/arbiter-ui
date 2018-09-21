import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConnectedRuleGroup from './RuleGroup';
import { actions } from 'store';
import { Input, Button, Form } from 'antd';
import { uniqueFacts, transformRuleset } from 'utils/ruleset';

class RulesetForm extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.testFormRef = React.createRef();
  }

  handleTestRuleset = () => {
    const data = {
      hash: this.state.testForm,
      rules: transformRuleset(this.props.ruleset)
    };
    this.props.testRuleset(data);
  };

  renderFact(fact) {
    return (
      <Input
        key={`test-${fact}`}
        name={fact}
        style={{ display: 'block', marginBottom: '20px', width: '200px' }}
        addonBefore={fact}
        defaultValue=""
      />
    );
  }

  handle = event => {
    const { target } = event;
    this.setState({
      testForm: { ...this.state.testForm, [target.name]: target.value }
    });
    console.log(this.state);
  };

  render() {
    const { pristine, submitting, reset, ruleset } = this.props;
    const facts = uniqueFacts(ruleset);

    return (
      <div className="form-container col">
        <div className="col">
          <ConnectedRuleGroup id={'1'} />
        </div>
        <div className="col">
          <h3>TEST DATA</h3>
          <Form ref={this.testFormRef} onChange={this.handle} layout="inline">
            {facts.map(this.renderFact)}
          </Form>
        </div>
        <div className="col">
          <div className="toolbar toolbar-vertical">
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
  return { ruleset: state.ruleset };
};

const mapDispatchToProps = {
  ...actions.schema,
  ...actions.ruleset
};

RulesetForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RulesetForm);

export default RulesetForm;
