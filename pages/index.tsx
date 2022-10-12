import type { NextPage } from 'next';

import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <h1>Homapage</h1>
      <Link href={'/signin'}>Sign In</Link>
      <br />
      <Link href={'/signup'}>Sign Up</Link>
    </div>
  );
};

export default Home;
