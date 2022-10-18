import type { NextPage } from 'next';
import SignInForm from '../../components/signin.component';

const SignInPage: NextPage = (props) => {
  return (
    <div>
      <h2>Sign In</h2>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
