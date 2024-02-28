import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <Link to={'/articles'}>articles</Link>
    </div>
  );
};

export default HomePage;
