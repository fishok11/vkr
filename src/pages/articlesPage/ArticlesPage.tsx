import React from 'react';
import CustomLink from '../../UI/customLink/CustomLink';
import styles from './ArticlesPage.module.scss';
import { useArticlesPage } from './logic/useArticlesPage';

const ArticlesPage = () => {
  const { state } = useArticlesPage();

  return (
    <div className={styles.container}>
      <div className={styles.chaptersContainer}>
        {state.chapters.map((chapter) => (
          <div key={chapter.id} className={styles.chapterContainer}>
            <h2 className={styles.chapter}>{chapter.chapter}</h2>
            <div className={styles.linksContainer}>
              {state.articles
                .filter((item) => item.chapterId == chapter.id)
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
