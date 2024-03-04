import React from 'react';
import CustomLink from '../../UI/customLink/CustomLink';
import styles from './ArticlesPage.module.scss';
import { useArticlesPage } from './logic/useArticlesPage';

const ArticlesPage = () => {
  const { state } = useArticlesPage();

  return (
    <div className={styles.container}>
      <div className={styles.linkContainer}>
        {state.articles.map((item) => (
          <CustomLink
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
