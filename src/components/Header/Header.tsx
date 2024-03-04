import React, { FC } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  return (
    <header className={styles.container}>
      <div className={styles.linkContainer}>
        <Link to={'/'} className={styles.link}>
          Главная
        </Link>
        <Link to={'/articles'} className={styles.link}>
          Статьи
        </Link>
        <Link to={'/about'} className={styles.link}>
          О нас
        </Link>
      </div>
    </header>
  );
};

export default Header;
