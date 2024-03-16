import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getUsers, userState } from '../../../app/userSlice';
import { useCookies } from 'react-cookie';

export const useUsersResults = () => {
  const dispatch = useAppDispatch();
  const stateUser = useAppSelector(userState);
  const [cookies] = useCookies(['user']);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return {
    stateUser,
    cookies,
  };
};
