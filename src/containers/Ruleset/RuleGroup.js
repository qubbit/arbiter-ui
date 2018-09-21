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
      children: [],
      condition: 'all'
    };
  }

  addRule = event => {
    console.info(`Adding a rule to group ${this.props.id}`);
    this.props.addRule(this.props.id);
  };

  addGroup = event => {
    console.info(`Adding a nested group inside group ${this.props.id}`);
    this.props.addRuleGroup(this.props.id);
  };

  updateGroup = (key, value) => {
    console.info(
      `Updating group ${this.props.id} inside group ${this.props.parentId}`
    );
    this.props.updateRuleGroup(this.props.id, { [key]: value });
  };

  removeGroup = event => {
    console.info(
      `Removing nested group ${this.props.id} inside group ${
        this.props.parentId
      }`
    );
    this.props.removeRuleGroup(this.props.id, this.props.parentId);
  };

  isRuleGroup(rule) {
    return 'condition' in rule;
  }

  renderChild = id => {
    const { parentId, condition } = this.props;

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
    const { parentId, condition, children } = this.props;

    if ('operator' in this.props) {
      return <Rule {...this.props} />;
    }
    return (
      <div
        className="rule-group"
        id={this.props.id}
        style={{ marginLeft: '20px', marginTop: '20px' }}
      >
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
  return state.ruleset.rules[ownProps.id];
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
