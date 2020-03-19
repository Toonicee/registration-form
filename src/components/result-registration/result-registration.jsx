import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Result } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';

const ResultRegistration = ({ success, changeSegistrationStatus }) => {
  return (
    <WrapperResult success={success}>
      <Result
        icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
        title="You are successfully registered!"
        extra={
          <Button onClick={() => changeSegistrationStatus(false)} type="primary">
            Next
          </Button>
        }
      />
    </WrapperResult>
  );
};

ResultRegistration.defaultProps = {
  success: false,
};

ResultRegistration.propTypes = {
  changeSegistrationStatus: PropTypes.func.isRequired,
  success: PropTypes.bool,
};

const WrapperResult = styled.div`
  position: absolute;
  display: ${props => (props.success ? 'block' : 'none')};
  z-index: 100;
  background-color: #fff;
`;

export default ResultRegistration;
