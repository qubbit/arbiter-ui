import React from 'react';
import Code from './Code';
import { transformRuleset } from 'utils/ruleset';
import { Icon } from 'antd';

const JsonRenderer = props => {
  const { ruleset, excludedKeys } = props;

  function replacer(key, value) {
    if (excludedKeys.includes(key)) return undefined;
    return value;
  }

  const code = JSON.stringify(transformRuleset(ruleset), replacer, 2);

  return (
    <div className="col">
      <div className="ui-area-header">
        <Icon type="code" theme="twoTone" twoToneColor="#fd558d" /> JSON
      </div>
      <Code source={code} />
    </div>
  );
};

export default JsonRenderer;
