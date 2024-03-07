import React from 'react';
import CustomLink from '../../UI/customLink/CustomLink';
import styles from './ArticlesPage.module.scss';
import { useArticlesPage } from './logic/useArticlesPage';
import Input from '../../UI/input/Input';
import { Article, Chapter } from '../../app/types';
import Loader from '../../UI/loader/Loader';

const ArticlesPage = () => {
  const { state, articleToSearch, setArticleToSearch } = useArticlesPage();

  if (state.isLoading) return <Loader />;

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
      <div className={styles.chaptersContainer}>
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
    </div>
  );
};

export default ArticlesPage;
