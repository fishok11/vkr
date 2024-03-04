import React, { FC } from 'react';
import styles from './Header.module.scss';
import CustomLink from '../../UI/customLink/CustomLink';

const Header: FC = () => {
  return (
    <header className={styles.container}>
      <div className={styles.linkContainer}>
        <CustomLink to={'/'} text="Главная" />
        <CustomLink to={'/articles'} text="Статьи" />
        <CustomLink to={'/about'} text="О нас" />
      </div>
    </header>
  );
};

export default Header;
