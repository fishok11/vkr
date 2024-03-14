import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getUsers, userState } from '../../../app/userSlice';
import { getChapters, mainState } from '../../../app/mainSlice';

export const useUsersResults = () => {
  const dispatch = useAppDispatch();
  const stateUser = useAppSelector(userState);
  const stateMain = useAppSelector(mainState);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getChapters());
  }, []);

  return {
    stateUser,
    stateMain,
  };
};
