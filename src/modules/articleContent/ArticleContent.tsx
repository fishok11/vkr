import React, { FC } from 'react';
import { useArticleContent } from './logic/useArticleContent';
import styles from './ArticleContent.module.scss';
import { Link } from 'react-router-dom';
import HTMLReactParser from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Questions from '../../components/questions/Questions';

const ArticleContent: FC = () => {
  const {
    state,
    articleId,
    articlesFilterByChapter,
    showResults,
    setShowResults,
    prevArticleId,
    nextArticleId,
  } = useArticleContent();

  return (
    <div className={styles.container}>
      <h1>{state.article.title}</h1>
      <p>{HTMLReactParser(state.article.content)}</p>
      <Questions
        articleId={articleId}
        showResults={showResults}
        onClick={() => setShowResults(true)}
      />
      {articlesFilterByChapter && (
        <div className={styles.linksContainer}>
          {prevArticleId && (
            <Link
              to={`/article/${prevArticleId}`}
              className={styles.prevLink}
              onClick={() => setShowResults(false)}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Назад
            </Link>
          )}
          {nextArticleId && (
            <Link
              to={`/article/${nextArticleId}`}
              className={styles.nextLink}
              onClick={() => setShowResults(false)}
            >
              Далее <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleContent;
