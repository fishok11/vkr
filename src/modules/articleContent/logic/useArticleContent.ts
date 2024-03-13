import { useEffect, useState } from 'react';
import { getArticle, getArticles, mainState } from '../../../app/mainSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useParams } from 'react-router';
import { useCookies } from 'react-cookie';

export const useArticleContent = () => {
  const { articleId } = useParams();
  const stateMain = useAppSelector(mainState);
  const dispatch = useAppDispatch();
  const [showResults, setShowResults] = useState<boolean>(false);
  const [cookies] = useCookies(['user']);

  useEffect(() => {
    if (articleId !== undefined) {
      dispatch(getArticle(articleId));
    }
    dispatch(getArticles(''));
    return () => setShowResults(false);
  }, [articleId]);

  const articlesFilterByChapter = stateMain.articles.filter(
    (article) => article.chapterId === stateMain.article.chapterId,
  );
  const currentIndex = articlesFilterByChapter.findIndex(
    (article) => article.id.toString() === articleId,
  );

  const prevArticleId =
    currentIndex > 0 ? articlesFilterByChapter[currentIndex - 1]?.id : '';
  const nextArticleId =
    currentIndex < articlesFilterByChapter.length - 1
      ? articlesFilterByChapter[currentIndex + 1]?.id
      : '';

  return {
    stateMain,
    articleId,
    showResults,
    setShowResults,
    prevArticleId,
    nextArticleId,
    cookies,
  };
};
