import React, { FC } from 'react';
import styles from './Input.module.scss';

type InputProps = {
  id: string;
  type: string;
  placeholder: string;
  min: number;
  max: number;
  value: number | string | [];
  onChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  label: string;
  error: boolean;
  helperText: string;
};

const Input: FC<Partial<InputProps>> = ({
  id,
  type,
  placeholder,
  min,
  max,
  value,
  onChange,
  label,
  error,
  helperText,
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={error ? styles.inputError : styles.input}
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
      {error && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
};

export default Input;
