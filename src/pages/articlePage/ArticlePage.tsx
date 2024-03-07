import React, { FC } from 'react';
import ArticleContent from '../../modules/articleContent/ArticleContent';
import SideBar from '../../components/sideBar/SideBar';
import styles from './ArticlePage.module.scss';
import Loader from '../../UI/loader/Loader';
import { useArticlePage } from './logic/useArticlePage';

const ArticlePage: FC = () => {
  const { state } = useArticlePage();

  // if (
  //   state.isLoadingArticle 
  // ) {
  //   return <Loader />;
  // }

  return (
    <div className={styles.container}>
      <SideBar />
      <ArticleContent />
    </div>
  );
};

export default ArticlePage;
