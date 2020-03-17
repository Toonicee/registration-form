import React from 'react';
import styled from 'styled-components';

import SignupForm from '../signup-form';
import ResultRegistration from '../result-registration/result-registration';
import FormWrapper from '../signup-form/styled-components';

import 'normalize.css';
import 'antd/dist/antd.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };
  }

  successfulRegistration = bool => {
    this.setState({ success: bool });
  };

  render() {
    const { success } = this.state;
    return (
      <Main>
        <FormWrapper success={success}>
          <SignupForm successfulRegistration={this.successfulRegistration} />
        </FormWrapper>
        <ResultRegistration
          success={success}
          successfulRegistration={this.successfulRegistration}
        />
      </Main>
    );
  }
}

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
