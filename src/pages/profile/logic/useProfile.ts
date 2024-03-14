import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect } from 'react';
import { getUser, userState } from '../../../app/userSlice';

export const useProfle = () => {
  const stateUser = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['user']);

  useEffect(() => {
    dispatch(getUser(cookies.user));
  }, []);

  return { stateUser, cookies };
};
