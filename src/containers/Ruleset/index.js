// @ts-check --jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import JsonRenderer from '../../components/JsonRenderer';
import RulesetForm from './RulesetForm';

class Ruleset extends Component {
  render() {
    return [
      <div className="flex-column">
        <RulesetForm />
        <JsonRenderer ruleset={this.props.ruleset} />
      </div>
    ];
  }
}

const mapStateToProps = state => {
  return { schema: state.schema, ruleset: state.ruleset };
};

export default connect(
  mapStateToProps,
  null
)(Ruleset);
