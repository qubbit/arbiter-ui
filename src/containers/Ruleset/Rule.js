import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse, Input, Form, Button, Radio, Select } from 'antd';
import * as rulesEngine from 'store/rulesEngine';

const { Option } = Select;

class Rule extends Component {
  static get defaultProps() {
    return {
      id: null,
      parentId: null,
      fact: null,
      operator: null,
      value: null,
      schema: null,
    };
  }

  removeRule = event => {
    console.log(event.target);
  };

  handleFactChange = event => {
    console.log(event.target);
  };

  render() {
    const {
      id,
      fact,
      operator,
      value,
      schema: { operators, facts },
    } = this.props;

    return (
      <div className="rule">
        <div className="field-container">
          <Select
            name={fact}
            defaultValue={fact || facts[0].name}
            style={{ width: 150 }}
            hasFeedback={false}
          >
            {facts.map(f => (
              <Option key={`fact-${f.name}`} value={f.name}>
                {f.label}
              </Option>
            ))}
          </Select>
        </div>
        <div className="field-container">
          <Select
            name="operator"
            defaultValue={operator || operators[0].value}
            style={{ width: 100 }}
            hasFeedback={false}
          >
            {operators.map(o => (
              <Option key={`operator-${o.value}`} value={o.value}>
                {o.label}
              </Option>
            ))}
          </Select>
        </div>
        <div className="field-container">
          <Input placeholder="value" />
        </div>
        <Button
          className="field-container"
          type="danger"
          title="Remove Rule"
          icon="delete"
          onClick={this.removeRule}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { schema: state.rulesEngine };
};

const mapDispatchToProps = {
  ...rulesEngine.actions,
};

Rule = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Rule);

export default Rule;
