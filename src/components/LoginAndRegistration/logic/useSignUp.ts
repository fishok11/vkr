import { nanoid } from 'nanoid';
import { createUser, hideSignUpModal, userState } from '../../../app/userSlice';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { User } from '../../../app/types';

export const useSignUp = () => {
  const stateUser = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPasswor, setErrorPasswor] = useState(false);
  const [cookies, setCookie] = useCookies(['user']);
  const user: User = {
    id: nanoid(),
    email: email,
    username: username,
    password: password,
  };

  function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleClick = () => {
    setErrorEmail(false);
    setErrorUsername(false);
    setErrorPasswor(false);

    if (
      user.email === '' ||
      !validateEmail(user.email) ||
      username === '' ||
      password === ''
    ) {
      if (user.email === '' || !validateEmail(user.email)) {
        setErrorEmail(true);
      }
      if (user.username === '') {
        setErrorUsername(true);
      }
      if (user.password === '') {
        setErrorPasswor(true);
      }
      
      return;
    }

    dispatch(createUser(user));
    setCookie('user', user.id, { maxAge: 259200 });
    dispatch(hideSignUpModal());
  };

  const handleCloseDignUpModal = () => {
    dispatch(hideSignUpModal());
  };

  return {
    stateUser,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    errorEmail,
    errorUsername,
    errorPasswor,
    handleClick,
    handleCloseDignUpModal,
  };
};
