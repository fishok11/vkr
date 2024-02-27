import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './LinkArticle.module.scss';

type LinkArticleProps = {
  to: string;
  text: string;
};

const LinkArticle: FC<LinkArticleProps> = ({ to, text }) => {
  return (
    <Link to={to} className={styles.link}>
      {text}
    </Link>
  );
};

export default LinkArticle;
