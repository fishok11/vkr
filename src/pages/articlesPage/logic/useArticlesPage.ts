import { useEffect, useState } from 'react';
import { getArticles, getChapters, mainState } from '../../../app/mainSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Article, Chapter } from '../../../app/types';

export const useArticlesPage = () => {
  const stateMain = useAppSelector(mainState);
  const dispatch = useAppDispatch();
  const [articleToSearch, setArticleToSearch] = useState<string>('');

  const filterChaptersByArticle = (
    chapters: Chapter[],
    articles: Article[],
  ) => {
    const resultArr: Chapter[] = [];

    chapters.forEach((chapter) => {
      articles.forEach((article) => {
        if (article.chapterId == chapter.id) {
          resultArr.push(chapter);
        }
      });
    });

    const uniqueChapters = resultArr.filter(
      (item: Chapter, index: number) => resultArr.indexOf(item) === index,
    );

    return uniqueChapters;
  };

  useEffect(() => {
    dispatch(getChapters());
  }, []);

  useEffect(() => {
    dispatch(getArticles(articleToSearch));
  }, [articleToSearch]);

  return {
    stateMain,
    articleToSearch,
    setArticleToSearch,
    filterChaptersByArticle,
  };
};
