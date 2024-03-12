import { logInUser, mainState } from '../../../app/mainSlice';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { UserLogIn } from '../../../app/types';

export const useLogIn = () => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['user']);

  const user: UserLogIn = {
    username: username,
    password: password,
  };

  const handleChange = async () => {
    if (user.username !== '' && user.password !== '' && user !== undefined) {
      setError(false);
      await dispatch(logInUser(user));
      // console.log(state.user.id);

      setCookie('user', state.user.id, { maxAge: 259200 });
    } else {
      setError(true);
    }
  };

  return {
    error,
    setError,
    username,
    setUsername,
    password,
    setPassword,
    handleChange,
  };
};
