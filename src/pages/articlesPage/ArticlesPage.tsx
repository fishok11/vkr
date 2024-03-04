import React from 'react';
import CustomLink from '../../UI/customLink/CustomLink';
import styles from './ArticlesPage.module.scss';
import { useArticlesPage } from './logic/useArticlesPage';

const ArticlesPage = () => {
  const { state } = useArticlesPage();

  return (
    <div className={styles.container}>
      <div className={styles.chaptersContainer}>
        {state.articles.map((article) => (
          <div key={article.chapter} className={styles.chapterContainer}>
            <h2 className={styles.chapter}>{article.chapter}</h2>
            <div className={styles.linksContainer}>
              {state.articles
                .filter((item) => item.chapter === article.chapter)
                .map((fiterArticle) => (
                  <CustomLink
                    key={fiterArticle.id}
                    to={`/article/${fiterArticle.id}`}
                    text={fiterArticle.title}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
