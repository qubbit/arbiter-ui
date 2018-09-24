import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store';
import { Icon, Input, Button, Select } from 'antd';

const { Option } = Select;

class Actions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAction: Object.keys(this.props.schema.actions)[0]
    };
  }

  selectAction = action => {
    this.setState({ selectedAction: action });
  };

  addAction = e => {
    this.props.addAction(this.state.selectedAction);
  };

  removeAction = e => {
    this.props.removeAction(1);
  };

  render() {
    const availableActions = this.props.schema.actions;
    const actionNames = Object.keys(availableActions);
    const rulesetActions = this.props.ruleset.actions;
    // debugger;

    return (
      <div className="col">
        <div className="ui-area-header">
          <Icon type="thunderbolt" theme="twoTone" twoToneColor="#FFC107" />{' '}
          ACTIONS
        </div>
        <div className="action-selection">
          <div className="field-container action__name">
            <Select
              name="action"
              defaultValue={actionNames[0]}
              style={{ width: 150 }}
              hasFeedback={false}
              onChange={this.selectAction}
            >
              {actionNames.map(a => (
                <Option key={`action-${a}`} value={a}>
                  {availableActions[a].label}
                </Option>
              ))}
            </Select>
          </div>
          <Button
            className="field-container"
            title="Add action"
            icon="plus"
            onClick={this.addAction}
          >
            Action
          </Button>
        </div>
        {Object.keys(rulesetActions).map(a => (
          <div key={`action-${a}`} className="action">
            <div className="action-name">
              <span>
                <strong>{a}</strong>
              </span>
              <span>
                <Button
                  className="field-container"
                  type="danger"
                  title="Remove action"
                  icon="delete"
                  onClick={this.removeAction}
                />
              </span>
            </div>
            {rulesetActions[a].params.map(param => {
              return (
                <div key={`action-${a}-param-${param.name}`}>
                  <Input addonBefore={param.name} style={{ width: '400px' }} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ruleset: state.ruleset, schema: state.schema };
};

const mapDispatchToProps = {
  ...actions.schema,
  ...actions.ruleset
};

Actions = connect(
  mapStateToProps,
  mapDispatchToProps
)(Actions);

export default Actions;
