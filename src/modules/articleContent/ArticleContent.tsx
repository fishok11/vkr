import React, { FC } from 'react';
import { useArticleContent } from './logic/useArticleContent';
import styles from './ArticleContent.module.scss';
import HTMLReactParser from 'html-react-parser';
import Questions from '../../components/questions/Questions';
import Loader from '../../UI/loader/Loader';
import Pagination from '../../components/pagination/Pagination';

const ArticleContent: FC = () => {
  const { stateMain, prevArticleId, nextArticleId } = useArticleContent();

  if (stateMain.isLoadingArticle) return <Loader />;

  return (
    <div className={styles.container}>
      <h1>{stateMain.article.title}</h1>
      {HTMLReactParser(stateMain.article.content)}
      <Questions />
      <Pagination prevArticleId={prevArticleId} nextArticleId={nextArticleId} />
    </div>
  );
};

export default ArticleContent;
