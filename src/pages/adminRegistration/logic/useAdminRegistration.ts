import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  showLogInModal,
  showSignUpModal,
  userState,
} from '../../../app/userSlice';

export const useAdminRegistration = () => {
  const stateUser = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['user']);

  const handleShowLogInModal = () => {
    dispatch(showLogInModal());
  };

  const handleShowSignUpModal = () => {
    dispatch(showSignUpModal());
  };

  return { stateUser, cookies, handleShowLogInModal, handleShowSignUpModal };
};
