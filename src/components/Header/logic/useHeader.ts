import { useCookies } from 'react-cookie';
import { useAppDispatch } from '../../../app/hooks';
import { showLogInModal, showSignUpModal } from '../../../app/userSlice';
import { useLocation } from 'react-router';

export const useHeader = () => {
  const dispach = useAppDispatch();
  const [cookies] = useCookies(['user']);
  const location = useLocation();
  const currentPath = location.pathname;

  const handleShowLogInModal = () => {
    dispach(showLogInModal());
  };

  const handleShowSignUpModal = () => {
    dispach(showSignUpModal());
  };

  return {
    cookies,
    currentPath,
    handleShowLogInModal,
    handleShowSignUpModal,
  };
};
