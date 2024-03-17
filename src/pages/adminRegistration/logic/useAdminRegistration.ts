import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { showSignUpModal, userState } from '../../../app/userSlice';

export const useAdminRegistration = () => {
  const stateUser = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['user']);

  const handleShowSignUpModal = () => {
    dispatch(showSignUpModal());
  };

  return { stateUser, cookies, handleShowSignUpModal };
};
