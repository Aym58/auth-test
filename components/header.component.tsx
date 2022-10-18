import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { userService } from '../services/user.service';

type Props = {
  auth: boolean;
};

const Header = (props: Props) => {
  const router = useRouter();
  const auth = props.auth;

  const buttonHandler = () => {
    router.push('/');
  };

  return (
    <div className="top-bar">
      {auth ? (
        <Button
          variant="contained"
          className="ButtonLogOut"
          onClick={userService.logout}
        >
          Log out
        </Button>
      ) : (
        <Button
          variant="contained"
          className="ButtonLogOut"
          onClick={buttonHandler}
        >
          Log in
        </Button>
      )}
    </div>
  );
};

export default Header;
