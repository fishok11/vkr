import React, { FC } from 'react';
import styles from './InfoPage.module.scss';

const InfoPage: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.text}>
          Разработал Ладыгин Всеволод Львович студент 19СН1с
        </h2>
      </div>
    </div>
  );
};

export default InfoPage;
