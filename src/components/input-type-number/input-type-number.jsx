import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber } from 'formik-antd';

const InputTypeNumber = ({ name, children }) => {
  return (
    <Form.Item name={name}>
      <label
        htmlFor={name}
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </label>
      <InputNumber id={name} name={name} />
    </Form.Item>
  );
};

InputTypeNumber.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};

export default InputTypeNumber;
