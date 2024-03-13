import React, { FC } from 'react';
import styles from './LoginAndRegistration.module.scss';
import { useLogIn } from './logic/useLogIn';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const LogIn: FC = () => {
  const {
    stateUser,
    error,
    username,
    setUsername,
    password,
    setPassword,
    handleClick,
    handleCloseLogInModal,
  } = useLogIn();

  if (!stateUser.logInModal) return null;

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <button
          className={styles.close}
          onClick={() => handleCloseLogInModal()}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
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
        <Button text={'OK'} onClick={() => handleClick()} />
        {error && <p className={styles.error}>Fill in all the fields!</p>}
      </div>
    </div>
  );
};

export default LogIn;
