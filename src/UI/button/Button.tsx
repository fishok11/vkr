import React, { FC } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  text: string;
  onClick: () => void;
};

const Button: FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className={styles.button} onClick={() => onClick()}>
      {text}
    </button>
  );
};

export default Button;
