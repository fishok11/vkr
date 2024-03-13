import React from 'react';
import CustomLink from '../../UI/customLink/CustomLink';
import styles from './ArticlesPage.module.scss';
import { useArticlesPage } from './logic/useArticlesPage';
import Input from '../../UI/input/Input';
import { Article, Chapter } from '../../app/types';
import Loader from '../../UI/loader/Loader';

const ArticlesPage = () => {
  const { stateMain, articleToSearch, setArticleToSearch } = useArticlesPage();

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <Input
          id={'search'}
          type={'text'}
          placeholder={'Поиск по статьям...'}
          value={articleToSearch}
          onChange={(e) => setArticleToSearch(e.target.value)}
        />
      </div>

      {(stateMain.isLoadingArticles === true ||
        stateMain.isLoadingChapters === true) && <Loader />}

      {(!stateMain.isLoadingArticles || !stateMain.isLoadingChapters) && (
        <div className={styles.chaptersContainer}>
          {stateMain.chapters.map((chapter: Chapter) => (
            <div key={chapter.id} className={styles.chapterContainer}>
              <h2 className={styles.chapter}>{chapter.chapter}</h2>
              <ul className={styles.linksContainer}>
                {stateMain.articles
                  .filter((item: Article) => item.chapterId == chapter.id)
                  .map((article: Article) => (
                    <li key={article.id}>
                      <CustomLink
                        to={`/article/${article.id}`}
                        text={article.title}
                      />
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
