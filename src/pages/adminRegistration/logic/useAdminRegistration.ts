import { useCookies } from 'react-cookie';
import { useAppDispatch } from '../../../app/hooks';
import { showLogInModal, showSignUpModal } from '../../../app/userSlice';

export const useAdminRegistration = () => {
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['user']);

  const handleShowLogInModal = () => {
    dispatch(showLogInModal());
  };

  const handleShowSignUpModal = () => {
    dispatch(showSignUpModal());
  };

  return { cookies, handleShowLogInModal, handleShowSignUpModal };
};
