import React, { FC } from 'react';
import Button from '../../UI/button/Button';
import styles from './AdminRegistration.module.scss';
import { useAdminRegistration } from './logic/useAdminRegistration';

const AdminRegistration: FC = () => {
  const { cookies, handleShowLogInModal, handleShowSignUpModal } =
    useAdminRegistration();

  if (cookies.user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>
        <Button
          text="Войти как администратор"
          onClick={() => handleShowLogInModal()}
        />
        <Button
          text="Заркгистрироваться как администратор"
          onClick={() => handleShowSignUpModal()}
        />
      </div>
    </div>
  );
};

export default AdminRegistration;
