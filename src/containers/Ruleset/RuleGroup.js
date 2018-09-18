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
    console.info(`Adding a nested group inside group ${this.props.id}`);
    this.props.addRuleGroup(this.props.id);
  };

  removeGroup = event => {
    console.info(
      `Removing nested group ${this.props.id} inside group ${
        this.props.parentId
      }`,
    );
    this.props.removeRuleGroup(this.props.id, this.props.parentId);
  };

  isRuleGroup(rule) {
    return 'condition' in rule;
  }

  render() {
    // console.log('props are', this.props);
    const { id, parentId, rules } = this.props;
    console.log('parent is', parentId);
    return (
      <div
        className="rule-group"
        id={this.props.id}
        style={{ marginLeft: '20px', marginTop: '20px' }}
      >
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
        {parentId && (
          <Button
            icon="delete"
            type="danger"
            onClick={this.removeGroup}
            className="field-container"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { schema: state.schema, rules: state.ruleset.ruleset[ownProps.id] };
};

const mapDispatchToProps = {
  ...actions.schema,
  ...actions.ruleset,
};

const ConnectedRuleGroup = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RuleGroup);

export default ConnectedRuleGroup;
