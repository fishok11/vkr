import React, { FC } from 'react';
import styles from './LoginAndRegistration.module.scss';
import { useSignUp } from './logic/useSignUp';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const SignUp: FC = () => {
  const {
    stateUser,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    errorEmail,
    errorUsername,
    errorPasswor,
    handleClick,
    handleCloseDignUpModal,
  } = useSignUp();

  if (!stateUser.signUpModal) return null;

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <button
          className={styles.close}
          onClick={() => handleCloseDignUpModal()}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <p className={styles.title}>Регистрация</p>
        <Input
          id={'email'}
          type={'text'}
          placeholder={'Email'}
          error={errorEmail}
          helperText={'Пустое или неправильное значение'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id={'username'}
          type={'text'}
          placeholder={'Username'}
          error={errorUsername}
          helperText={'Пустое значение'}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          id={'password'}
          type={'password'}
          placeholder={'Password'}
          error={errorPasswor}
          helperText={'Пустое значение'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button text={'OK'} onClick={() => handleClick()} />
      </div>
    </div>
  );
};

export default SignUp;
