import { getUserResults, userState } from './../../../app/userSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const useUserPrtofle = () => {
  const stateUser = useAppSelector(userState);
  const dispatch = useAppDispatch();
    const [cookies] = useCookies(['user']);

  useEffect(() => {
    dispatch(getUserResults(cookies.user));
  }, []);

  return { stateUser };
};
