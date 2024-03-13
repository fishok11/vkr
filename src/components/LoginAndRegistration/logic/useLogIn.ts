import { hideLogInModal, logInUser, userState } from '../../../app/userSlice';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { UserLogIn } from '../../../app/types';

export const useLogIn = () => {
  const stateUser = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPasswor, setErrorPasswor] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['user']);

  const user: UserLogIn = {
    username: username,
    password: password,
  };

  const handleClick = () => {
    setErrorUsername(false);
    setErrorUsername(false);

    if (username === '' || password === '') {
      if (user.username === '') {
        setErrorUsername(true);
      }
      if (user.password === '') {
        setErrorPasswor(true);
      }
      
      return;
    }

    dispatch(logInUser(user));
  };

  useEffect(() => {
    if (cookies.user === undefined && stateUser.user.id !== '') {
      setCookie('user', stateUser.user.id, { maxAge: 259200 });
      dispatch(hideLogInModal());
    }
  }, [stateUser.user.id]);

  const handleCloseLogInModal = () => {
    dispatch(hideLogInModal());
  };

  return {
    stateUser,
    username,
    setUsername,
    password,
    setPassword,
    errorUsername,
    errorPasswor,
    handleClick,
    handleCloseLogInModal,
  };
};
