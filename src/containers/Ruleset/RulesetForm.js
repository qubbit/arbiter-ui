import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConnectedRuleGroup from './RuleGroup';
import { actions } from 'store';
import { Button } from 'antd';
import { transformRuleset } from 'utils/ruleset';

class RulesetForm extends Component {
  handleTestRuleset = () => {
    const data = { hash: {}, rules: transformRuleset(this.props.ruleset) };
    this.props.testRuleset(data);
  };

  render() {
    const { pristine, submitting, reset } = this.props;
    return (
      <div className="form-container col">
        <div className="col">
          <ConnectedRuleGroup id={'1'} />
        </div>
        <div className="col">
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
