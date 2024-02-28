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
      {state.articles.map((item) => (
        <LinkArticle key={item.id} to={item.title} text={item.title} />
      ))}
    </div>
  );
};

export default ArticlesPage;
