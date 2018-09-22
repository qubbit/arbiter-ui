import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConnectedRuleGroup from './RuleGroup';
import { actions } from 'store';
import { Icon, Input } from 'antd';

class RulesetForm extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.testFormRef = React.createRef();
  }

  renderFact(fact) {
    return (
      <Input
        key={`test-${fact}`}
        name={fact}
        style={{ display: 'block', marginBottom: '20px' }}
        addonBefore={fact}
        defaultValue=""
      />
    );
  }

  handle = event => {
    const { target } = event;
    this.setState({
      testForm: { ...this.state.testForm, [target.name]: target.value }
    });
    console.log(this.state);
  };

  render() {
    const { pristine, submitting, reset, ruleset } = this.props;

    return (
      <div className="flex-row col">
        <div className="ruleset-container col">
          <div className="ui-area-header">
            <Icon type="build" theme="twoTone" twoToneColor="#ff7e00" /> RULES
          </div>
          <ConnectedRuleGroup id={'1'} />
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
