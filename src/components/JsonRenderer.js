import React from 'react';
import { values as valuesDecorator } from 'redux-form';
import Code from './Code';

const JsonRenderer = ({
  form,
  format = values => JSON.stringify(values, null, 2),
}) => {
  const decorator = valuesDecorator({ form });
  const component = ({ values }) => (
    <div className="col">
      <span>JSON</span>
      <Code source={format(values)} />
    </div>
  );
  const Decorated = decorator(component);
  return <Decorated />;
};

export default JsonRenderer;
