import { useEffect, useState } from 'react';
import {
  getArticle,
  getArticles,
  getQuestions,
  mainState,
} from '../../../app/mainSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useParams } from 'react-router';

export const useArticlePage = () => {
  const { articleId } = useParams();
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();
  const [showResults, setShowResults] = useState<boolean>(false);

  useEffect(() => {
    if (articleId !== undefined) {
      dispatch(getArticle(articleId));
    }
    dispatch(getArticles(''));
  }, [articleId]);

  const articlesFilterByChapter = state.articles.filter(
    (article) => article.chapterId === state.article.chapterId,
  );
  const currentIndex = articlesFilterByChapter.findIndex(
    (article) => article.id.toString() === articleId,
  );

  const prevArticleId =
    currentIndex > 0 ? articlesFilterByChapter[currentIndex - 1]?.id : null;
  const nextArticleId =
    currentIndex < articlesFilterByChapter.length - 1
      ? articlesFilterByChapter[currentIndex + 1]?.id
      : null;articleId

  return {
    state,
    articleId,
    showResults,
    setShowResults,
    articlesFilterByChapter,
    prevArticleId,
    nextArticleId,
  };
};
