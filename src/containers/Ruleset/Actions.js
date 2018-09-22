import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store';
import { Alert, Icon, Input, Button } from 'antd';

class Actions extends Component {
  render() {
    const { ruleset } = this.props;
    return (
      <div className="flex-row col">
        <div className="ui-area-header">
          <Icon type="thunderbolt" theme="twoTone" twoToneColor="#FFC107" />{' '}
          ACTIONS
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

Actions = connect(
  mapStateToProps,
  mapDispatchToProps
)(Actions);

export default Actions;
