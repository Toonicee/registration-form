import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'formik-antd';

const InputTypePassword = ({ name, placeholder, children }) => {
  return (
    <Form.Item name={name}>
      <label htmlFor={name}>{children}</label>
      <Input.Password id={name} name={name} placeholder={placeholder} />
    </Form.Item>
  );
};

InputTypePassword.defaultProps = {
  placeholder: '',
};

InputTypePassword.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default InputTypePassword;
