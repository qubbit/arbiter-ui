import React from 'react';
import Code from './Code';
import { transformRuleset } from 'utils/ruleset';

const JsonRenderer = props => {
  const { ruleset, excludedKeys } = props;

  function replacer(key, value) {
    if (excludedKeys.includes(key)) return undefined;
    return value;
  }

  const code = JSON.stringify(transformRuleset(ruleset), replacer, 2);

  return (
    <div className="col">
      <span>JSON</span>
      <Code source={code} />
    </div>
  );
};

export default JsonRenderer;
