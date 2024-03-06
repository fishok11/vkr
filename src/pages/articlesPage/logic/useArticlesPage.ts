import { useEffect, useState } from 'react';
import { getArticles, getChapters, mainState } from '../../../app/mainSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

export const useArticlesPage = () => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();
  const [articleToSearch, setArticleToSearch] = useState<string>('');

  useEffect(() => {
    dispatch(getChapters());
    dispatch(getArticles(articleToSearch));
  }, [dispatch, articleToSearch]);

  return {
    state,
    articleToSearch,
    setArticleToSearch,
  };
};
