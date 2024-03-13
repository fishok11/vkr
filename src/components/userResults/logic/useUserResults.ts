import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getArticles, getQuestions, mainState } from '../../../app/mainSlice';
import { getUserResults, userState } from '../../../app/userSlice';
import { useEffect, useState } from 'react';

export const useUserResults = () => {
  const stateMain = useAppSelector(mainState);
  const stateUser = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['user']);
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const onTitleClick = (index: string) => {
    index === activeIndex ? setActiveIndex(null) : setActiveIndex(index);
  };

  useEffect(() => {
    dispatch(getUserResults(cookies.user));
    dispatch(getArticles(''));
    dispatch(getQuestions());
  }, []);

  return { stateMain, stateUser, activeIndex, onTitleClick };
};
