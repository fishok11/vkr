import { nanoid } from 'nanoid';
import {
  createUser,
  hideLogInModal,
  hideSignUpModal,
  logInUser,
  userState,
} from '../../../app/userSlice';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { User, UserLogIn } from '../../../app/types';
import { useLocation } from 'react-router';

export const useRegistration = () => {
  const stateUser = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPasswor, setErrorPasswor] = useState(false);
  const [cookies, setCookie] = useCookies(['user']);
  const location = useLocation();
  const currentPath = location.pathname;

  const userSignUp: User = {
    id: nanoid(),
    email: email,
    username: username,
    password: password,
    admin: currentPath === '/admin' ? true : false,
  };

  const userLogIn: UserLogIn = {
    username: username,
    password: password,
  };

  const handleCloseModal = () => {
    dispatch(hideLogInModal());
    dispatch(hideSignUpModal());
  };

  //=============================================SignUp

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleClickSignUp = () => {
    setErrorEmail(false);
    setErrorUsername(false);
    setErrorPasswor(false);

    if (
      userSignUp.email === '' ||
      !validateEmail(userSignUp.email) ||
      username === '' ||
      password === ''
    ) {
      if (userSignUp.email === '' || !validateEmail(userSignUp.email)) {
        setErrorEmail(true);
      }
      if (userSignUp.username === '') {
        setErrorUsername(true);
      }
      if (userSignUp.password === '') {
        setErrorPasswor(true);
      }

      return;
    }

    dispatch(createUser(userSignUp));
    setCookie('user', userSignUp.id, { maxAge: 259200 });
    handleCloseModal();
  };

  //=============================================SignUp

  //=============================================LogIn

  const handleClickLogIn = () => {
    setErrorUsername(false);
    setErrorUsername(false);

    if (username === '' || password === '') {
      if (userLogIn.username === '') {
        setErrorUsername(true);
      }
      if (userLogIn.password === '') {
        setErrorPasswor(true);
      }

      return;
    }

    dispatch(logInUser(userLogIn));
  };

  useEffect(() => {
    if (cookies.user === undefined && stateUser.user.id !== '') {
      setCookie('user', stateUser.user.id, { maxAge: 259200 });
      handleCloseModal();
    }

    return () => {
      setEmail('');
      setUsername('');
      setPassword('');
    };
  }, [stateUser.user.id]);

  //=============================================LogIn

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
    handleClickSignUp,
    handleClickLogIn,
    handleCloseModal,
  };
};
