import React from 'react';
import Code from './Code';
import cloneDeep from 'lodash/cloneDeep';
import { transformRuleset } from 'utils/ruleset';

const JsonRenderer = ruleset => {
  var clone = cloneDeep(ruleset);
  const code = JSON.stringify(transformRuleset(clone.ruleset), null, 2);

  return (
    <div className="col">
      <span>JSON</span>
      <Code source={code} />
    </div>
  );
};

export default JsonRenderer;
