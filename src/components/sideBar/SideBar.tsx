import React, { FC } from 'react';
import { useSideBar } from './logic/useSideBar';
import CustomLink from '../../UI/customLink/CustomLink';
import { Article, Chapter } from '../../app/types';
import styles from './SideBar.module.scss';

const SideBar: FC = () => {
  const { state } = useSideBar();

  if (state.isLoadingArticles || state.isLoadingChapters) return null;

  return (
    <div className={styles.sideBarContainer}>
      {state.chapters.map((chapter: Chapter) => (
        <div key={chapter.id} className={styles.chapterContainer}>
          <h2 className={styles.chapter}>{chapter.chapter}</h2>
          <div className={styles.linksContainer}>
            {state.articles
              .filter((item: Article) => item.chapterId == chapter.id)
              .map((fiterArticle: Article) => (
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
  );
};

export default SideBar;
