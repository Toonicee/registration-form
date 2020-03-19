const express = require('express');
const Yup = require('yup');

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const users = [];

const addUser = user => users.push(user);
const findOne = where => {
  const [[key, value]] = Object.entries(where);
  const use = users.find(user => user[key] === value);
  return use === undefined;
};

const validationSchema = Yup.object().shape({
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
    .test('email', 'this email is already registered', value => findOne({ email: value }))
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
app.post('/sing-up', async function(req, res) {
  try {
    const data = await validationSchema.validate(req.body);
    const { acceptTerms, ...rest } = data;
    addUser(rest);
    return res.status(201).json();
  } catch (err) {
    const { path, errors } = err;
    return res.status(422).json({ errors: { [path]: errors } });
  }
});

app.get('/sing-up', function(req, res) {
  res.send(users);
});
app.listen(5000, () => {
  console.log(`start server port ${PORT}`);
});
