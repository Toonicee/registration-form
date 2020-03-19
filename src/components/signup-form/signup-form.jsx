import React from 'react';
import { Form, Input, SubmitButton, ResetButton } from 'formik-antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, message } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Services from '../../services/services';
import InputTypeText from '../Input-type-text';
import InputTypePassword from '../Input-type-password';
import InputTypeNumber from '../Input-type-number';
import InputTypeCheckbox from '../Input-type-checkbox';

const validation = Yup.object().shape({
  name: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .max(40, 'Must be 40 characters or less')
    .test(
      'pass',
      'Latin letters and numbers only, at least one number and one capital letter',
      value => /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/.test(value)
    )
    .required('Required'),
  repeatPassword: Yup.string()
    .test('passwords-match', 'Password does not match', function(value) {
      return this.parent.password === value;
    })
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  website: Yup.string().url(),
  age: Yup.string()
    .test('age', 'Only numbers', value => /(?=.*[0-9])/.test(value))
    .test('no-null', 'Enter the correct number', value => value !== null)
    .test('min', 'you must be older 18', value => value >= 18)
    .test('max', 'you must be no older than 65', value => value <= 65)
    .nullable()
    .required('Required'),
  acceptTerms: Yup.boolean()
    .test('age', 'Confirm actions', val => val === true)
    .required('Required'),
});

class SignupForm extends React.Component {
  initialState = {
    skills: [],
    skillInput: '',
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.skillInput = React.createRef();
  }

  addSkills = () => {
    const { skills, skillInput } = this.state;
    this.setState({
      skills: [...skills, skillInput],
      skillInput: '',
    });
  };

  removeSkill = index => () => {
    const { skills } = this.state;
    const updateSkills = skills.filter((skill, id) => id !== index);
    this.setState({ skills: updateSkills });
  };

  chahgeSkill = ({ target }) => {
    this.setState({ skillInput: target.value });
  };

  onSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
    const { changeSegistrationStatus } = this.props;
    console.log(values);
    const { skills } = this.state;
    const { skill, ...data } = { ...values, skills };

    Services.submitFormData(data)
      .then(() => {
        setSubmitting(false);
        changeSegistrationStatus(true);
        resetForm();
      })
      .catch(error => {
        setSubmitting(false);
        if (error.request.status === 422) {
          const { errors } = error.response.data;
          setErrors(errors);
        } else {
          message.error(error.message);
        }
      });
  };

  render() {
    const { skills, skillInput } = this.state;
    return (
      <Formik
        initialValues={{
          name: '',
          password: '',
          repeatPassword: '',
          email: '',
          website: '',
          age: 0,
          acceptTerms: false,
        }}
        validationSchema={validation}
        onSubmit={this.onSubmit}
      >
        <Form>
          <InputTypeText name="name" placeholder="Enter your name">
            Your name
          </InputTypeText>
          <InputTypeText type="email" name="email" placeholder="your-email@email.com">
            Your email
          </InputTypeText>
          <InputTypePassword name="password" placeholder="Enter password">
            Your password
          </InputTypePassword>
          <InputTypePassword name="repeatPassword" placeholder="Enter confirm password">
            Confirm password
          </InputTypePassword>
          <InputTypeNumber name="age">Your age</InputTypeNumber>
          <InputTypeText name="website" placeholder="https://your-website.com">
            Website
          </InputTypeText>
          <Form.Item name="skill">
            <label htmlFor="skills">Your skills</label>
            <RowSkill>
              <Input id="skills" value={skillInput} onChange={this.chahgeSkill} />
              <Button type="primary" onClick={this.addSkills} disabled={skillInput === ''}>
                add skill
              </Button>
            </RowSkill>
            {skills.map((value, index) => (
              <SkillItem key={value}>
                {value}
                <BtnClose onClick={this.removeSkill(index)}>
                  <DeleteTwoTone />
                </BtnClose>
              </SkillItem>
            ))}
          </Form.Item>
          <InputTypeCheckbox name="acceptTerms">accept terms</InputTypeCheckbox>
          <RowBtn>
            <SubmitButton>Submit</SubmitButton>
            <ResetButton onClick={() => this.setState(this.initialState)}>Reset</ResetButton>
          </RowBtn>
        </Form>
      </Formik>
    );
  }
}

SignupForm.propTypes = {
  changeSegistrationStatus: PropTypes.func.isRequired,
};

const SkillItem = styled.div`
  color: rgba(0, 0, 0, 0.87);
  margin: 4px;
  padding: 0 30px 0 12px;
  height: 30px;
  display: inline-flex;
  box-sizing: border-box;
  position: relative;
  align-items: center;
  white-space: nowrap;
  border-radius: 16px;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;
  border: 1px solid #e0e0e0;
`;

const BtnClose = styled.button`
  width: 0;
  right: 22px;
  top: -6px;
  z-index: 100;
  position: absolute;
  padding: 0;
  cursor: pointer;
  border: none;
  height: 0;
  fill: currentColor;
  display: inline-block;
  font-size: 1rem;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  flex-shrink: 0;
  user-select: none;
`;

const RowSkill = styled.div`
  display: grid;
  grid-template-columns: 65% 30%;
  grid-column-gap: 5%;
`;

const RowBtn = styled.div`
  display: grid;
  grid-template-columns: 25% 25%;
  grid-column-gap: 30px;
`;

export default SignupForm;
