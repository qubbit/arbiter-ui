import React from 'react';
import { values as valuesDecorator } from 'redux-form';
import Code from './Code';
import Transformer from '../utils/transformer.js';

const JsonRenderer = ({
  form,
  format = values => JSON.stringify(values, null, 2),
}) => {
  const decorator = valuesDecorator({ form });
  const component = ({ values }) => {
    const trasformed = Transformer.transform(values);
    return (
      <div className="col">
        <span>JSON</span>
        <Code source={format(trasformed)} />
      </div>
    );
  };
  const Decorated = decorator(component);
  return <Decorated />;
};

export default JsonRenderer;
