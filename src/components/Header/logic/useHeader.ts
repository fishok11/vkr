import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getUser, showLogInModal, showSignUpModal, userState } from '../../../app/userSlice';
import { useLocation } from 'react-router';
import { useEffect } from 'react';

export const useHeader = () => {
  const stateUser = useAppSelector(userState)
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['user']);
  const location = useLocation();
  const currentPath = location.pathname;

  const handleShowLogInModal = () => {
    dispatch(showLogInModal());
  };

  const handleShowSignUpModal = () => {
    dispatch(showSignUpModal());
  };

  useEffect(() => {
    dispatch(getUser(cookies.user));
  }, [])

  return {
    stateUser,
    cookies,
    currentPath,
    handleShowLogInModal,
    handleShowSignUpModal,
  };
};
