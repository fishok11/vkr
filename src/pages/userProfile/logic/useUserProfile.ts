import { getQuestions, mainState } from './../../../app/mainSlice';
import { getUserResults, userState } from './../../../app/userSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getArticles } from '../../../app/mainSlice';

export const useUserPrtofle = () => {
  const stateMain = useAppSelector(mainState);
  const stateUser = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['user']);
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const onTitleClick = (index: string) => {
    activeIndex !== null ? setActiveIndex(null) : setActiveIndex(index);
  };

  useEffect(() => {
    dispatch(getUserResults(cookies.user));
    dispatch(getArticles(''));
    dispatch(getQuestions());
  }, []);

  return { stateMain, stateUser, activeIndex, onTitleClick };
};
