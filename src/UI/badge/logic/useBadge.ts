import { useEffect, useState } from 'react';
import styles from '../Badge.module.scss';

export const useBadge = ({ grade }: { grade: number }) => {
  const [badgeColor, setBadgeColor] = useState('');
  useEffect(() => {
    if (grade < 50) {
      setBadgeColor(styles.red);
    }
    if (grade >= 50 && grade <= 80) {
      setBadgeColor(styles.yellow);
    }
    if (grade > 80) {
      setBadgeColor(styles.green);
    }
  }, [grade]);

  return { badgeColor };
};
