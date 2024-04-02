import React, { FC } from 'react';
import styles from './Header.module.scss';
import CustomLink from '../../UI/customLink/CustomLink';
import { useHeader } from './logic/useHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faRightToBracket,
  faUser,
  faUserPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  const {
    stateUser,
    cookies,
    currentPath,
    handleShowLogInModal,
    handleShowSignUpModal,
    openMenu,
    handleShowMenu,
    handleHideMenu,
  } = useHeader();

  return (
    <>
      <header className={styles.container}>
        <div>
          <button
            className={styles.menuButton}
            onClick={() => handleShowMenu()}
          >
            {!openMenu && <FontAwesomeIcon icon={faBars} />}
            {openMenu && <FontAwesomeIcon icon={faXmark} />}
          </button>
        </div>
        <div className={styles.linkContainer}>
          <CustomLink to={'/'} text={'Главная'} />
          <CustomLink to={'/articles'} text={'Курсы'} />
          <CustomLink to={'/about'} text={'Инфо'} />
        </div>
        <div className={styles.buttonContainer}>
          {!cookies.user && currentPath !== '/admin' && (
            <>
              <div
                className={styles.ico}
                onClick={() => handleShowLogInModal()}
              >
                <FontAwesomeIcon icon={faRightToBracket} />
              </div>
              <div
                className={styles.ico}
                onClick={() => handleShowLogInModal()}
              >
                <FontAwesomeIcon
                  icon={faUserPlus}
                  onClick={() => handleShowSignUpModal()}
                />
              </div>
            </>
          )}
          {cookies.user && (
            <Link
              to={`/profile/${cookies.user}`}
              className={styles.profileLink}
            >
              {stateUser.user.username} <FontAwesomeIcon icon={faUser} />
            </Link>
          )}
        </div>
      </header>
      {openMenu && (
        <ul className={styles.menu}>
          <li onClick={() => handleHideMenu()}>
            <CustomLink to={'/'} text={'Главная'} />
          </li>
          <li onClick={() => handleHideMenu()}>
            <CustomLink to={'/articles'} text={'Курсы'} />
          </li>
          <li onClick={() => handleHideMenu()}>
            <CustomLink to={'/about'} text={'Инфо'} />
          </li>
        </ul>
      )}
    </>
  );
};

export default Header;
