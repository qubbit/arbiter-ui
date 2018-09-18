import React, { Component } from 'react';
import { connect } from 'react-redux';
import RuleGroup from './RuleGroup';
import { actions } from 'store';
import Rule from './Rule';

class RulesetForm extends Component {
  handleTestRuleset = () => {
    this.props.testRuleset({});
  };

  isRuleGroup(rule) {
    return 'condition' in rule;
  }

  render() {
    const { ruleset } = this.props;

    return (
      <div className="form-container col">
        <div className="col">
          {Object.keys(ruleset).map(k => {
            var r = ruleset[k];
            if (this.isRuleGroup(r)) {
              return <RuleGroup key={r.id} {...r} />;
            } else {
              return <Rule key={r.id} {...r} />;
            }
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // debugger;
  return { ruleset: state.ruleset.ruleset };
  // return state[ownProps.id]; //
};

const mapDispatchToProps = {
  ...actions.schema,
  ...actions.ruleset,
};

RulesetForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RulesetForm);

export default RulesetForm;
