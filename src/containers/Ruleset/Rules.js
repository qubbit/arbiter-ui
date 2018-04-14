import React from 'react';
import { Field } from 'redux-form';
import { Select, Button } from 'antd';
import { connect } from 'react-redux';
import { ASelect } from '../../components/Elements';
import * as rulesEngine from 'store/rulesEngine';

const { Option } = Select;

class Rules extends React.Component {
  handleFactChange = fact => {
    this.props.changeFact(fact);
  };

  render() {
    const {
      rulesEngine,
      fields,
      meta: { touched, error, submitFailed },
    } = this.props;

    const { facts, selectedValues } = rulesEngine;

    return (
      <div className="rules-container">
        <div className="toolbar">
          <Button
            title="Add Rule"
            icon="plus"
            type="primary"
            onClick={() => fields.push({})}
          >
            Add Rule
          </Button>
        </div>
        {fields.length > 0 && <div>When the</div>}
        {(touched || submitFailed) && error && <span>{error}</span>}
        {fields.map((rule, index) => (
          <div className="rule" key={index}>
            <Button
              className="field-container"
              type="danger"
              title="Remove Rule"
              icon="delete"
              onClick={() => fields.remove(index)}
            />
            <div className="field-container">
              <span>rule #{index + 1}</span>
            </div>
            <div className="field-container">
              <Field
                name={`${rule}.fact`}
                component={ASelect}
                onSelect={this.handleFactChange}
              >
                {facts.map(f => (
                  <Option key={f.name} value={f.name}>
                    {f.label}
                  </Option>
                ))}
              </Field>
            </div>
            <div className="field-container">
              <Field
                name={`${rule}.condition`}
                component={ASelect}
                onChange={null}
              >
                <Option value="in">is one of</Option>
                <Option value="eq">is exactly</Option>
                <Option value="not_eq">does not equal</Option>
              </Field>
            </div>
            <div className="field-container">
              <Field name={`${rule}.value`} component={ASelect} onChange={null}>
                {selectedValues.map(f => (
                  <Option key={f} value={f}>
                    {f}
                  </Option>
                ))}
              </Field>
            </div>
          </div>
        ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Rules);
