import React, { FC } from 'react';
import { useParams } from 'react-router';

const ArticlePage: FC = () => {
  const { articleId } = useParams();

  return <div></div>;
};

export default ArticlePage;
