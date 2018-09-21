import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConnectedRuleGroup from './RuleGroup';
import { actions } from 'store';

class RulesetForm extends Component {
  handleTestRuleset = () => {
    this.props.testRuleset({});
  };

  render() {
    return (
      <div className="form-container col">
        <div className="col">
          <ConnectedRuleGroup id={'1'} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { ruleset: state.ruleset.ruleset };
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
