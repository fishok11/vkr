import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect } from 'react';
import { getResults, getUser, userState } from '../../../app/userSlice';
import { getArticles, getChapters, getQuestions } from '../../../app/mainSlice';

export const useProfle = () => {
  const stateUser = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  useEffect(() => {
    dispatch(getUser(cookies.user));
    dispatch(getResults());
    dispatch(getChapters());
    dispatch(getArticles(''));
    dispatch(getQuestions());
  }, []);

  return { stateUser, cookies, removeCookie };
};
