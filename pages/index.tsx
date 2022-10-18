import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { userService } from '../services/user.service';

const HomePage: NextPage = () => {
  const router = useRouter();
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    if (userService.userValue) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  return (
    <>
      {auth ? (
        <div>
          <h3>You are signed in!</h3>
          <h3>Browse to your profile:</h3>
          <Button
            variant="contained"
            className="ButtonItem"
            onClick={() => {
              router.push('/profile');
            }}
          >
            My profile
          </Button>
        </div>
      ) : (
        <div>
          <h3>You are not signed in</h3>
          <h3>Please sign in:</h3>
          <Button
            variant="contained"
            className="ButtonItem"
            onClick={() => {
              router.push('/signin');
            }}
          >
            Sign In
          </Button>
          <h3>Or create an account:</h3>
          <Button
            variant="contained"
            className="ButtonItem"
            onClick={() => {
              router.push('/signup');
            }}
          >
            Create an account
          </Button>
        </div>
      )}
    </>
  );
};
export default HomePage;
