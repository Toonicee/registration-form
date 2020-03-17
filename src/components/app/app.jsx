import React from 'react';
import styled from 'styled-components';

import SignupForm from '../signup-form';
import ResultRegistration from '../result-registration';

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

const FormWrapper = styled.div`
  min-width: 30%;
  padding: 2%;
  opacity: ${props => (props.success ? 0.3 : 1)};
  border-radius: 5px;
  margin: 50px 0;
  box-shadow: 0px 0px 26px 4px rgba(0, 0, 0, 0.31);
`;

export default App;
