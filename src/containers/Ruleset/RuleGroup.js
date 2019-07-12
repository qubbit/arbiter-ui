import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Radio } from 'antd';
import { actions } from 'store';
import Rule from './Rule';

class RuleGroup extends Component {
  static get defaultProps() {
    return {
      rule: {
        id: null,
        parentId: null,
        children: [],
        condition: 'all'
      }
    };
  }

  addRule = event => {
    console.info(`Adding a rule to group ${this.props.rule.id}`);
    this.props.addRule(this.props.rule.id);
  };

  addGroup = event => {
    console.info(`Adding a nested group inside group ${this.props.rule.id}`);
    this.props.addRuleGroup(this.props.rule.id);
  };

  updateGroup = (key, value) => {
    console.info(
      `Updating group ${this.props.rule.id} inside group ${this.props.rule.parentId}`
    );
    this.props.updateRuleGroup(this.props.rule.id, { [key]: value });
  };

  removeGroup = event => {
    console.info(
      `Removing nested group ${this.props.rule.id} inside group ${this.props.rule.parentId}`
    );
    this.props.removeRuleGroup(this.props.rule.id, this.props.rule.parentId);
  };

  isRule(rule) {
    return 'operator' in rule;
  }

  renderChild = id => {
    const { rule } = this.props;
    const { parentId, condition } = rule;

    if (condition) {
      return (
        <ConnectedRuleGroup
          key={`rule-group-${id}`}
          id={id}
          parentId={parentId}
        />
      );
    }
    return <Rule key={`rule-${id}`} />;
  };

  render() {
    const { rule, test } = this.props;
    const { id, parentId, condition, children } = rule;

    if (this.isRule(rule)) {
      return <Rule rule={rule} test={test} />;
    }

    return (
      <div className="rule-group" id={id}>
        <div className="rule-group-controls">
          <Radio.Group
            defaultValue={condition}
            buttonStyle="solid"
            className="field-container"
            onChange={e => {
              this.updateGroup('condition', e.target.value);
            }}
          >
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="any">Any</Radio.Button>
          </Radio.Group>
          <Button
            icon="plus"
            onClick={this.addRule}
            className="field-container"
          >
            Rule
          </Button>
          <Button
            icon="plus"
            onClick={this.addGroup}
            className="field-container"
          >
            Group
          </Button>
          {parentId && (
            <Button
              icon="delete"
              type="danger"
              onClick={this.removeGroup}
              className="field-container"
            />
          )}
        </div>
        {children.map(this.renderChild)}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    rule: state.ruleset.rules[ownProps.id],
    test: state.ruleset.test.rules[ownProps.id]
  };
};

const mapDispatchToProps = {
  ...actions.schema,
  ...actions.ruleset
};

const ConnectedRuleGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(RuleGroup);

export default ConnectedRuleGroup;
