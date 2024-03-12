import React, { FC } from 'react';
import styles from './LoginAndRegistration.module.scss';
import { useSignUp } from './logic/useSignUp';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const SignUp: FC = () => {
  const {
    state,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleClick,
    handleCloseDignUpModal,
  } = useSignUp();

  if (!state.signUpModal) return null;

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <button
          className={styles.close}
          onClick={() => handleCloseDignUpModal()}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
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
        <Button text={'OK'} onClick={() => handleClick()} />
        {error && <p className={styles.error}>Fill in all the fields!</p>}
      </div>
    </div>
  );
};

export default SignUp;
