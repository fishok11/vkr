import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './CustomLink.module.scss';

type CustomLinkProps = {
  to: string;
  text: string;
};

const CustomLink: FC<CustomLinkProps> = ({ to, text }) => {
  return (
    <Link to={to} className={styles.link}>
      {text}
    </Link>
  );
};

export default CustomLink;
