import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { userService } from '../services/user.service';

type SignInValues = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const router = useRouter();

  const formik: FormikProps<SignInValues> = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email('Enter a valid email')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required'),
    }),

    onSubmit: async (values: SignInValues) => {
      const { email, password } = values;
      const res = await userService.login(email, password);
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
      <Button variant="contained" className="ButtonItem" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default SignInForm;
