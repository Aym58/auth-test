import type { NextPage } from 'next';
import { Formik } from 'formik';

type SignInFormValues = {
  email: string;
  password: string;
};

const SignIn: NextPage = () => {
  const initialValues: SignInFormValues = {
    email: '',
    password: '',
  };

  return (
    <div>
      <h1>Sign In</h1>
    </div>
  );
};

export default SignIn;
