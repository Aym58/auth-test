import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { FormikProps, useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import type { SignUpValues } from '../types/types';

import { userService } from '../services/user.service';

const SignUpForm = () => {
  const router = useRouter();
  const formik: FormikProps<SignUpValues> = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string()
        .email('Enter a valid email')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required'),
      repeatPassword: Yup.string()
        .required('Please repeat your password')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    }),

    onSubmit: async (values: SignUpValues) => {
      const res = await userService.register(values);
      if (res.status === 'success') {
        router.push('/profile');
      } else {
        alert(res.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        className="TextFieldItem"
        label="First Name"
        id="firstName"
        type="text"
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        {...formik.getFieldProps('firstName')}
      />

      <TextField
        className="TextFieldItem"
        label="Last Name"
        id="lastName"
        type="text"
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
        {...formik.getFieldProps('lastName')}
      />

      <TextField
        className="TextFieldItem"
        label="Email"
        id="email"
        type="text"
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        {...formik.getFieldProps('email')}
      />

      <TextField
        className="TextFieldItem"
        label="Password"
        id="password"
        type="password"
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        {...formik.getFieldProps('password')}
      />

      <TextField
        className="TextFieldItem"
        label="Repeat password"
        id="repeatPassword"
        type="password"
        error={
          formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)
        }
        helperText={
          formik.touched.repeatPassword && formik.errors.repeatPassword
        }
        {...formik.getFieldProps('repeatPassword')}
      />

      <Button variant="contained" className="ButtonItem" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default SignUpForm;
