import React, { FC } from 'react';
import { useSideBar } from './logic/useSideBar';
import CustomLink from '../../UI/customLink/CustomLink';
import { Article, Chapter } from '../../app/types';
import styles from './SideBar.module.scss';

const SideBar: FC = () => {
  const { stateMain } = useSideBar();

  if (stateMain.isLoadingArticles || stateMain.isLoadingChapters) return null;

  return (
    <div className={styles.sideBarContainer}>
      {stateMain.chapters.map((chapter: Chapter) => (
        <div key={chapter.id} className={styles.chapterContainer}>
          <h2 className={styles.chapter}>{chapter.chapter}</h2>
          <ul className={styles.linksContainer}>
            {stateMain.articles
              .filter((item: Article) => item.chapterId == chapter.id)
              .map((fiterArticle: Article) => (
                <li key={fiterArticle.id}>
                  <CustomLink
                    to={`/article/${fiterArticle.id}`}
                    text={fiterArticle.title}
                  />
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
