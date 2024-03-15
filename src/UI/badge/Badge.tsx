import React, { FC } from 'react';
import styles from './Badge.module.scss';

type BudgeProps = {
  text: number;
};

const Badge: FC<BudgeProps> = ({ text }) => {
  return <span className={styles.badge}>{Math.floor(text)}%</span>;
};

export default Badge;
