import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getUser,
  showLogInModal,
  showSignUpModal,
  userState,
} from '../../../app/userSlice';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';

export const useHeader = () => {
  const stateUser = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const [cookies] = useCookies(['user']);
  const location = useLocation();
  const currentPath = location.pathname;

  const handleShowLogInModal = () => {
    dispatch(showLogInModal());
  };

  const handleShowSignUpModal = () => {
    dispatch(showSignUpModal());
  };

  const handleShowMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleHideMenu = () => {
    setOpenMenu(false);
  };

  useEffect(() => {
    if (cookies.user) dispatch(getUser(cookies.user));
  }, []);

  return {
    stateUser,
    cookies,
    currentPath,
    handleShowLogInModal,
    handleShowSignUpModal,
    openMenu,
    handleShowMenu,
    handleHideMenu,
  };
};
