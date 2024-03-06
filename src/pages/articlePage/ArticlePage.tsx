import React, { FC } from 'react';
import ArticleContent from '../../modules/articleContent/ArticleContent';
import SideBar from '../../components/sideBar/SideBar';
import styles from './ArticlePage.module.scss';

const ArticlePage: FC = () => {
  return (
    <div className={styles.container}>
      <SideBar />
      <ArticleContent />
    </div>
  );
};

export default ArticlePage;
