import React from 'react';
import { connect } from 'react-redux';
import { Button, Radio } from 'antd';
import * as rulesEngine from 'store/rulesEngine';

class RuleGroup extends React.Component {
  static get defaultProps() {
    return {
      id: null,
      parentId: null,
      rules: [],
      combinator: 'and',
    };
  }

  addRule = event => {
    console.log(event.target);
  };

  addGroup = event => {
    console.log(event.target);
  };

  render() {
    return (
      <div className="rule-group">
        <Radio.Group
          defaultValue={this.props.combinator}
          buttonStyle="solid"
          className="field-container"
        >
          <Radio.Button value="and">And</Radio.Button>
          <Radio.Button value="or">Or</Radio.Button>
        </Radio.Group>
        <Button icon="plus" onClick={this.addRule} className="field-container">
          Rule
        </Button>
        <Button icon="plus" onClick={this.addGroup} className="field-container">
          Group
        </Button>
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

RuleGroup = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RuleGroup);

export default RuleGroup;
