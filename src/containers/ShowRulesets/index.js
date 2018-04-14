// @ts-check --jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowRulesets extends Component {
  render() {
    return <div className="page view-rulesets" />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShowRulesets);
