import React, { FC } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  return (
    <header className={styles.container}>
      <div className={styles.linkContainer}>
        <Link to={'/'} className={styles.link}>
          Home
        </Link>
        <Link to={'/articles'} className={styles.link}>
          Articles
        </Link>
      </div>
    </header>
  );
};

export default Header;
