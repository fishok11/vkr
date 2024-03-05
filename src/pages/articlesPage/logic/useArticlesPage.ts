import { useEffect } from 'react';
import { getArticles, getChapters, mainState } from '../../../app/mainSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

export const useArticlesPage = () => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getChapters());
    dispatch(getArticles());
  }, [dispatch]);

  return {
    state,
  };
};
