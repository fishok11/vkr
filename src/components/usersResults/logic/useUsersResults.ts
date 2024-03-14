import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getUsers, userState } from '../../../app/userSlice';

export const useUsersResults = () => {
  const dispatch = useAppDispatch();
  const stateUser = useAppSelector(userState);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return {
    stateUser,
  };
};
