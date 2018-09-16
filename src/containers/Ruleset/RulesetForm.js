import React, { Component } from 'react';
import { connect } from 'react-redux';
import RuleGroup from './RuleGroup';
import * as schema from 'store/schema';

class RulesetForm extends Component {
  handleTestRuleset = () => {
    this.props.testRuleset({});
  };

  render() {
    const { ruleset } = this.props;
    return (
      <div className="form-container col">
        <div className="col">
          <RuleGroup {...ruleset} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ruleset: state.ruleset.ruleset };
};

const mapDispatchToProps = {
  ...schema.actions,
};

RulesetForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RulesetForm);

export default RulesetForm;
