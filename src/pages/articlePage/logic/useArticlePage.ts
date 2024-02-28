import { useEffect } from 'react';
import { getArticle, getQuestions, mainState } from '../../../app/mainSlice';
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
    dispatch(getQuestions());
  }, []);

  return {
    state,
    articleId,
  };
};
