import { nanoid } from 'nanoid';
import { createUser } from '../../../app/userSlice';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { User } from '../../../app/types';

export const useSignUp = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [cookies, setCookie] = useCookies(['user']);
  const user: User = {
    id: nanoid(),
    email: email,
    username: username,
    password: password,
  };

  const handleChange = () => {
    if (
      email !== '' &&
      username !== '' &&
      password !== '' &&
      user !== undefined
    ) {
      setError(false);
      dispatch(createUser(user));
      setCookie('user', user.id, { maxAge: 259200 });
    } else {
      setError(true);
    }
  };

  return {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    error,
    setError,
    handleChange,
  };
};
