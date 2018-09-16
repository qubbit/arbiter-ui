import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Select, TextField } from 'redux-form-antd';
import Rules from './Rules';
import RuleGroup from './RuleGroup';
import Rule from './Rule';
import { Collapse, Form, Button, Radio, Select as S } from 'antd';
import { ARadioGroup, ASelect, ASwitch } from '../../components/Elements';
import * as rulesEngine from 'store/rulesEngine';

const { Option } = S;
const { Panel } = Collapse;

class RulesetForm extends React.Component {
  handleActionChange = action => {
    this.props.changeAction(action);
  };

  handleTestRuleset = () => {
    this.props.testRuleset({});
  };

  render() {
    const {
      rulesEngine,
      handleSubmit,
      pristine,
      reset,
      submitting,
    } = this.props;

    const { actions, selectedAction } = rulesEngine;

    return (
      <div className="form-container col">
        <div className="col">
          <RuleGroup />
          <Rule />
        </div>
        {/* Toolbar column */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { rulesEngine: state.rulesEngine };
};

const mapDispatchToProps = {
  ...rulesEngine.actions,
};

RulesetForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RulesetForm);

export default RulesetForm;
