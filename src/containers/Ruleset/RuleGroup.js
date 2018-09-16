import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Radio } from 'antd';
import { actions } from 'store';
import Rule from './Rule';

class RuleGroup extends Component {
  static get defaultProps() {
    return {
      id: null,
      parentId: null,
      rules: [],
      condition: 'and',
    };
  }

  addRule = event => {
    console.info(`Adding a rule to group ${this.props.id}`);
    this.props.addRule(this.props.id);
  };

  addGroup = event => {
    debugger;
    console.info(`Adding a nested group inside group ${this.props.id}`);
    this.props.addRuleGroup(this.props.id);
  };

  render() {
    const { rules } = this.props;
    return (
      <div className="rule-group" id={this.props.id}>
        <Radio.Group
          defaultValue={this.props.condition}
          buttonStyle="solid"
          className="field-container"
        >
          <Radio.Button value="and">And</Radio.Button>
          <Radio.Button value="or">Or</Radio.Button>
        </Radio.Group>
        <Button icon="plus" onClick={this.addRule} className="field-container">
          Rule
        </Button>
        <Button icon="plus" onClick={this.addGroup} className="field-container">
          Group
        </Button>
        {rules.map(r => {
          if (r.condition) {
            return <RuleGroup key={r.id} {...r} />;
          } else {
            return <Rule key={r.id} {...r} />;
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { schema: state.schema, rules: state.ruleset.ruleset.rules };
};

const mapDispatchToProps = {
  ...actions.schema,
  ...actions.ruleset,
};

RuleGroup = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RuleGroup);

export default RuleGroup;
