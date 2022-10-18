import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { userService } from '../../services/user.service';

import type { UserValues } from '../../types/types';

const UserPage: NextPage = () => {
  const [user, setUser] = useState<UserValues | null>(null);

  useEffect(() => {
    userService
      .getUser()
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (user) {
    return (
      <div>
        <h2>My profile</h2>
        <h2>
          Name: {user.firstName} {user.lastName}
        </h2>
        <h2>Email: {user.email}</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Please sign in </h2>
      </div>
    );
  }
};

export default UserPage;
