import React from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox } from 'formik-antd';

const InputTypeCheckbox = ({ name, children }) => {
  return (
    <Form.Item name={name}>
      <Checkbox name={name}>{children}</Checkbox>
    </Form.Item>
  );
};

InputTypeCheckbox.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};
export default InputTypeCheckbox;
