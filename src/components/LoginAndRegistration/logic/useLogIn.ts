import { hideLogInModal, logInUser, userState } from '../../../app/userSlice';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { UserLogIn } from '../../../app/types';

export const useLogIn = () => {
  const stateUser = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['user']);

  const user: UserLogIn = {
    username: username,
    password: password,
  };

  const handleClick = () => {
    if (user.username !== '' && user.password !== '' && user !== undefined) {
      setError(false);
      dispatch(logInUser(user));
      dispatch(hideLogInModal());
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (cookies.user === undefined && stateUser.user.id !== '') {
      setCookie('user', stateUser.user.id, { maxAge: 259200 });
    }
  }, [stateUser.user.id]);

  const handleCloseLogInModal = () => {
    dispatch(hideLogInModal());
  };

  return {
    stateUser,
    error,
    setError,
    username,
    setUsername,
    password,
    setPassword,
    handleClick,
    handleCloseLogInModal,
  };
};
