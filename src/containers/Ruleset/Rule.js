import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Select } from 'antd';
import { actions } from 'store';

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
    console.info(`Removing rule ${this.props.id} from ${this.props.parentId}`);
    this.props.removeRule(this.props.id, this.props.parentId);
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
      <div
        className="rule"
        id={id}
        style={{ marginLeft: '20px', marginTop: '20px' }}
      >
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
          <Input placeholder="value" defaultValue={value} />
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
  return { schema: state.schema };
};

const mapDispatchToProps = {
  ...actions.schema,
  ...actions.ruleset,
};

Rule = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Rule);

export default Rule;
