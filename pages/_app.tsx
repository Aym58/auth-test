import { useState, useEffect } from 'react';
import { userService } from '../services/user.service';
import type { AppProps } from 'next/app';
import Header from '../components/header.component';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  const [authorized, setAuthorized] = useState<boolean>(false);

  useEffect(() => {
    if (userService.userValue) {
      setAuthorized(true);
    }
    if (!userService.userValue) {
      setAuthorized(false);
    }
  }, [userService.userValue]);

  return (
    <>
      <Header auth={authorized} />
      <div className="body-container">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default App;
