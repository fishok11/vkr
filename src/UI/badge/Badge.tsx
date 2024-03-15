import React, { FC } from 'react';
import { useBadge } from './logic/useBadge';

type BudgeProps = {
  grade: number;
};

const Badge: FC<BudgeProps> = ({ grade }) => {
  const { badgeColor } = useBadge({ grade });

  return <span className={badgeColor}>{Math.floor(grade)}%</span>;
};

export default Badge;
