import React, { FC } from 'react';
import styles from './Header.module.scss';
import CustomLink from '../../UI/customLink/CustomLink';
import Button from '../../UI/button/Button';
import { useHeader } from './logic/useHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header: FC = () => {
  const { cookies, handleShowLogInModal, handleShowSignUpModal } = useHeader();

  return (
    <header className={styles.container}>
      <div className={styles.linkContainer}>
        <CustomLink to={'/'} text="Главная" />
        <CustomLink to={'/articles'} text="Статьи" />
        <CustomLink to={'/about'} text="Инфо" />
      </div>
      <div className={styles.buttonContainer}>
        {!cookies.user && (
          <>
            <Button text={'Вход'} onClick={() => handleShowLogInModal()} />
            <Button
              text={'Регистрация'}
              onClick={() => handleShowSignUpModal()}
            />
          </>
        )}
        {cookies.user && (
          <>
            <button>
              <FontAwesomeIcon icon={faUser} />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
