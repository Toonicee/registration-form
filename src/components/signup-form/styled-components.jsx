import styled from 'styled-components';

const FormWrapper = styled.div`
  min-width: 30%;
  padding: 2%;
  opacity: ${props => (props.success ? 0.3 : 1)};
  border-radius: 5px;
  margin: 50px 0;
  box-shadow: 0px 0px 26px 4px rgba(0, 0, 0, 0.31);
`;

export default FormWrapper;
