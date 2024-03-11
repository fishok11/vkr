import React from 'react';
import CustomLink from '../../UI/customLink/CustomLink';
import styles from './ArticlesPage.module.scss';
import { useArticlesPage } from './logic/useArticlesPage';
import Input from '../../UI/input/Input';
import { Article, Chapter } from '../../app/types';
import Loader from '../../UI/loader/Loader';

const ArticlesPage = () => {
  const { state, articleToSearch, setArticleToSearch } = useArticlesPage();

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
      {(state.isLoadingArticles === true ||
        state.isLoadingChapters === true) && <Loader />}
      {(!state.isLoadingArticles || !state.isLoadingChapters) && (
        <div className={styles.chaptersContainer}>
          {state.chapters.map((chapter: Chapter) => (
            <div key={chapter.id} className={styles.chapterContainer}>
              <h2 className={styles.chapter}>{chapter.chapter}</h2>
              <div className={styles.linksContainer}>
                {state.articles
                  .filter((item: Article) => item.chapterId == chapter.id)
                  .map((article: Article) => (
                    <CustomLink
                      key={article.id}
                      to={`/article/${article.id}`}
                      text={article.title}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
