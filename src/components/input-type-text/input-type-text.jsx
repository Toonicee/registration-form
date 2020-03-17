import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'formik-antd';

const InputTypeText = ({ type, name, placeholder, children }) => {
  return (
    <Form.Item name={name}>
      <label htmlFor={name}>{children}</label>
      <Input id={name} type={type} name={name} placeholder={placeholder} />
    </Form.Item>
  );
};

InputTypeText.defaultProps = {
  type: 'text',
  placeholder: '',
};

InputTypeText.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};
export default InputTypeText;
