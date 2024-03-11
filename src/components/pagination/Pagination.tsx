import React, { FC } from 'react';
import styles from './Pagination.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

type PaginationProps = {
  prevArticleId: string;
  nextArticleId: string;
};

const Pagination: FC<PaginationProps> = ({ prevArticleId, nextArticleId }) => {
  return (
    <div className={styles.linksContainer}>
      {prevArticleId && (
        <Link to={`/article/${prevArticleId}`} className={styles.prevLink}>
          <FontAwesomeIcon icon={faArrowLeft} /> Назад
        </Link>
      )}
      {nextArticleId && (
        <Link to={`/article/${nextArticleId}`} className={styles.nextLink}>
          Далее <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      )}
    </div>
  );
};

export default Pagination;
