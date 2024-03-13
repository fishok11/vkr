import React, { FC } from 'react';
import styles from './LoginAndRegistration.module.scss';
import { useRegistration } from './logic/useRegistration';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Registration: FC = () => {
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
    handleClickSignUp,
    handleClickLogIn,
    handleCloseModal,
  } = useRegistration();

  // if (!stateUser.signUpModal && !stateUser.logInModal) return null;

  return (
    <>
      {(stateUser.signUpModal || stateUser.logInModal) && (
        <div className={styles.container}>
          <div className={styles.item}>
            <button className={styles.close} onClick={() => handleCloseModal()}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <p className={styles.title}>
              {stateUser.signUpModal ? 'Регистрация' : 'Авторизация'}
            </p>
            {stateUser.signUpModal && (
              <Input
                id={'email'}
                type={'text'}
                placeholder={'Email'}
                error={errorEmail}
                helperText={'Пустое или неправильное значение'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
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
            <Button
              text={'OK'}
              onClick={() =>
                stateUser.signUpModal ? handleClickSignUp() : handleClickLogIn()
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Registration;
