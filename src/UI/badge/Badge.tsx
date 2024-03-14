import React, { FC } from 'react';
import styles from './Badge.module.scss';

type BudgeProps = {
  text: string;
};

const Badge: FC<BudgeProps> = ({ text }) => {
  return <span className={styles.badge}>{text}</span>;
};

export default Badge;
