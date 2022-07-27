import React from "react";
import { Form, Input } from "antd";

const FormField = ({
  name,
  placeholder,
  icon,
  type,
  validateFunction,
  help,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <Form.Item validateStatus={validateFunction} help={help} hasFeedback>
      <Input
        id={name}
        size="large"
        placeholder={placeholder}
        prefix={icon}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </Form.Item>
  );
};
export default FormField;