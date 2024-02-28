import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getArticles, mainState } from '../../app/mainSlice';
import LinkArticle from '../../UI/linkArticle/LinkArticle';
import styles from './ArticlesPage.module.scss'

const ArticlesPage = () => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.linkContainer}>
        {state.articles.map((item) => (
          <LinkArticle
            key={item.id}
            to={`/article/${item.title}`}
            text={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
