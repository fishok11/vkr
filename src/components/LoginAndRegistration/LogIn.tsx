import React, { FC } from 'react';
import styles from './LoginAndRegistration.module.scss';
import { useLogIn } from './logic/useLogIn';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';

const LogIn: FC = () => {
  const { error, username, setUsername, password, setPassword, handleChange } =
    useLogIn();

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div
          className={styles.close}
          // onClick={() => closeLogInWindow(false)}
        >
          Close
        </div>
        <p className={styles.title}>Log in</p>
        <Input
          id={'Username'}
          type={'text'}
          placeholder={'Username'}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          id={'Password'}
          type={'password'}
          placeholder={'Password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button text={'OK'} onClick={() => handleChange()} />
        {error && <p className={styles.error}>Fill in all the fields!</p>}
      </div>
    </div>
  );
};

export default LogIn;
