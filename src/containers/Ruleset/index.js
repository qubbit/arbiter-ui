// @ts-check --jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import JsonRenderer from '../../components/JsonRenderer';
import RulesetForm from './RulesetForm';
import RulesetTest from './RulesetTest';
import Actions from './Actions';
import { Row, Col } from 'antd';

class Ruleset extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <RulesetForm />
          </Col>
          <Col span={12}>
            <Actions />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <JsonRenderer
              ruleset={this.props.ruleset}
              excludedKeys={this.props.schema.keysExcludedFromPreview}
            />
          </Col>
          <Col span={12}>
            <RulesetTest />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { schema: state.schema, ruleset: state.ruleset };
};

export default connect(
  mapStateToProps,
  null
)(Ruleset);
