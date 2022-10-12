import type { NextPage } from 'next';

import { useRouter } from 'next/router';

const User: NextPage = () => {
  const router = useRouter();

  console.log(router.query);

  return (
    <div>
      <h1>User</h1>
    </div>
  );
};

export default User;
