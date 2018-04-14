// @ts-check --jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import JsonRenderer from '../../components/JsonRenderer';
import RulesetForm from './RulesetForm';
import { Divider } from 'antd';

class Ruleset extends Component {
  render() {
    return [
      <Divider orientation="left">{this.props.rulesEngine.name}</Divider>,
      <div className="flex-column">
        <RulesetForm />
        <JsonRenderer form="rulesetForm" />
      </div>,
    ];
  }
}

const mapStateToProps = state => {
  return { rulesEngine: state.rulesEngine };
};

export default connect(mapStateToProps, null)(Ruleset);
