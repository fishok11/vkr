import { useCookies } from 'react-cookie';
import { useAppDispatch } from '../../../app/hooks';
import { showLogInModal, showSignUpModal } from '../../../app/userSlice';

export const useHeader = () => {
  const dispach = useAppDispatch();
  const [cookies] = useCookies(['user']);

  const handleShowLogInModal = () => {
    dispach(showLogInModal());
  };

  const handleShowSignUpModal = () => {
    dispach(showSignUpModal());
  };

  return {
    cookies,
    handleShowLogInModal,
    handleShowSignUpModal,
  };
};
