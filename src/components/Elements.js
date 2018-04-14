import React from 'react';
import { Form, Input, Radio, Select, Checkbox } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {},
  wrapperCol: {},
};

const makeField = Component => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  ...rest
}) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      {...formItemLayout}
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest} children={children} />
    </FormItem>
  );
};

const AInput = makeField(Input);
const ARadioGroup = makeField(RadioGroup);
const ASelect = makeField(Select);
const ACheckbox = makeField(Checkbox);
const ATextarea = makeField(TextArea);

export { AInput, ARadioGroup, ASelect, ACheckbox, ATextarea };
