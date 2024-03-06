import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getArticles, getChapters, mainState } from '../../../app/mainSlice';

export const useSideBar = () => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getChapters());
    dispatch(getArticles(''));
  }, [dispatch]);

  return {
    state,
  };
};
