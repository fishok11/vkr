import React, { FC } from 'react';
import { useSideBar } from './logic/useSideBar';
import styles from './SideBar.module.scss';
import CustomLink from '../../UI/customLink/CustomLink';
import { Article, Chapter } from '../../app/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const SideBar: FC = () => {
  const { state, open, setOpen, sideBarRef, sideBarStyle } = useSideBar();

  return (
    <>
      {open && (
        <div ref={sideBarRef} className={sideBarStyle}>
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
      )}
      {!open && (
        <button className={styles.button} onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}
    </>
  );
};

export default SideBar;
