import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store';
import { Row, Col, Alert, Icon, Input, Button, Form } from 'antd';
import { uniqueFacts, transformRuleset } from 'utils/ruleset';

class RulesetTest extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.testFormRef = React.createRef();
  }

  handleTestRuleset = () => {
    const data = {
      hash: this.state.testForm,
      rules: transformRuleset(this.props.ruleset)
    };
    this.props.testRuleset(data);
  };

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
    const { pristine, submitting, ruleset } = this.props;
    const facts = uniqueFacts(ruleset);

    return (
      <Row className="col ruleset-test-area">
        <Col span={24} className="ui-area-header">
          <Icon type="experiment" theme="twoTone" twoToneColor="#52c41a" /> TEST
        </Col>
        <Row>
          <Col span={12}>
            <Form ref={this.testFormRef} onChange={this.handle} layout="inline">
              {!facts.length && (
                <Alert
                  message="Add rules to the ruleset and test them here"
                  type="info"
                  style={{ marginBottom: '20px' }}
                />
              )}
              {facts.length > 0 && (
                <Alert
                  message="Fill out the boxes for each field below and click on Test Ruleset"
                  type="info"
                  style={{ marginBottom: '20px' }}
                />
              )}
              {facts.map(this.renderFact)}
            </Form>
          </Col>
          <Col span={12}>
            <Button
              style={{ width: '200px' }}
              type="secondary"
              icon="rocket"
              disabled={pristine || submitting}
              onClick={this.handleTestRuleset}
            >
              Test Ruleset
            </Button>
            <Button
              style={{ width: '200px' }}
              type="primary"
              icon="save"
              disabled={pristine || submitting}
            >
              Create Ruleset
            </Button>
          </Col>
        </Row>
      </Row>
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

RulesetTest = connect(
  mapStateToProps,
  mapDispatchToProps
)(RulesetTest);

export default RulesetTest;
