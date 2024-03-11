import React, { FC } from 'react';
import styles from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={styles.container}>
      <p className={styles.text}>2024</p>
    </footer>
  );
};

export default Footer;
