import React, { FC, useEffect, useState } from 'react';
import styles from './Badge.module.scss';

type BudgeProps = {
  grade: number;
};

const Badge: FC<BudgeProps> = ({ grade }) => {
  const [badgeColor, setBadgeColor] = useState('');
  useEffect(() => {
    if (grade <= 30) {
      setBadgeColor(styles.red);
    }
    if (grade > 30 && grade <= 50) {
      setBadgeColor(styles.yellow);
    }
    if (grade > 50) {
      setBadgeColor(styles.green);
    }
  }, [grade]);

  return <span className={badgeColor}>{Math.floor(grade)}%</span>;
};

export default Badge;
