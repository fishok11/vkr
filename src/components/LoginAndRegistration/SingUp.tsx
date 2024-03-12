import React, { FC } from 'react';
import styles from './LoginAndRegistration.module.scss';
import { useSignUp } from './logic/useSignUp';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';

const SignUp: FC = () => {
  const {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleChange,
  } = useSignUp();

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.close}>Close</div>
        <p className={styles.title}>Sing up</p>
        <Input
          type={'text'}
          placeholder={'Email'}
          id={'email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type={'text'}
          placeholder={'Username'}
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type={'password'}
          placeholder={'Password'}
          id={'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button text={'OK'} onClick={() => handleChange()} />
        {error && <p className={styles.error}>Fill in all the fields!</p>}
      </div>
    </div>
  );
};

export default SignUp;
