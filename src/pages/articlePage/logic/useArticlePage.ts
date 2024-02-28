import { useEffect } from 'react';
import { getArticle, mainState } from '../../../app/mainSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useParams } from 'react-router';

export const useArticlePage = () => {
  const { articleId } = useParams();
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (articleId !== undefined) {
      dispatch(getArticle(articleId));
    }
  }, []);

  return {
    state,
  };
};
