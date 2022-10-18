import type { NextPage } from 'next';
import SignUpForm from '../../components/signup.component';

const SignUpPage: NextPage = () => {
  return (
    <div>
      <h2>Create an account</h2>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
