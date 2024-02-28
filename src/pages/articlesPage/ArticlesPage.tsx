import React from 'react';
import LinkArticle from '../../UI/linkArticle/LinkArticle';
import styles from './ArticlesPage.module.scss';
import { useArticlesPage } from './logic/useArticlesPage';

const ArticlesPage = () => {
  const { state } = useArticlesPage();

  return (
    <div className={styles.container}>
      <div className={styles.linkContainer}>
        {state.articles.map((item) => (
          <LinkArticle
            key={item.id}
            to={`/article/${item.id}`}
            text={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
