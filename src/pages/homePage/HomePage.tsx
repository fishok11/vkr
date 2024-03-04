import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        WEB - ресурс для проверки знаний военнослужащих по военным
        специальностям
      </h1>
      <div className={styles.link}>
        <Link to={'/articles'}>Начать</Link>
      </div>
    </div>
  );
};

export default HomePage;
