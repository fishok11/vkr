import React, { FC } from 'react';
import styles from './ArticlePage.module.scss';
import { useArticlePage } from './logic/useArticlePage';

const ArticlePage: FC = () => {
  const { state } = useArticlePage();

  if (state.isLoading === true) return null;

  return (
    <div className={styles.container}>
      <p>{state.article.content}</p>
    </div>
  );
};

export default ArticlePage;
