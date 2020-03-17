import React from 'react';
import { Form, Input, SubmitButton, ResetButton } from 'formik-antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, message } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { Formik } from 'formik';
import * as Yup from 'yup';

import InputTypeText from '../input-type-text';
import InputTypePassword from '../input-type-password';
import InputTypeNumber from '../input-type-number';
import InputTypeCheckbox from '../input-type-checkbox';

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
  age: Yup.number()
    .max(65, 'you must be no older than 65')
    .positive()
    .integer()
    .required('Required'),
  acceptTerms: Yup.boolean()
    .test('age', 'Confirm actions', val => val === true)
    .required('Required'),
});

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      skill: '',
    };
  }

  addSkills = () => {
    const { skill, skills } = this.state;
    this.setState({
      skills: [...skills, skill],
      skill: '',
    });
  };

  chahgeSkill = ({ target }) => {
    this.setState({ skill: target.value });
  };

  removeSkill = index => () => {
    const { skills } = this.state;
    const updateSkills = skills.filter((skill, id) => id !== index);
    this.setState({ skills: updateSkills });
  };

  onSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
    const { successfulRegistration } = this.props;
    const { skills } = this.state;
    const { skill, ...data } = { ...values, skills };
    const appURL = 'http://localhost:5000/sing-up';
    console.log(values);
    axios
      .post(appURL, data)
      .then(() => {
        setSubmitting(false);
        successfulRegistration(true);
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
    const { skills, skill } = this.state;
    return (
      <Formik
        initialValues={{
          name: '',
          password: '',
          repeatPassword: '',
          email: '',
          website: '',
          age: '',
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
            <label>Your skills</label>
            <RowSkill>
              <Input id="skill" value={skill} onChange={this.chahgeSkill} />
              <Button type="primary" onClick={this.addSkills} disabled={skill === ''}>
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
            <ResetButton onClick={() => this.setState({ skills: [] })}>Reset</ResetButton>
          </RowBtn>
        </Form>
      </Formik>
    );
  }
}

SignupForm.propTypes = {
  successfulRegistration: PropTypes.func.isRequired,
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
