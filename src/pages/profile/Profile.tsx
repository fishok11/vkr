import React, { FC } from 'react';
import styles from './Profile.module.scss';
import { useProfle } from './logic/useProfile';
import UserResults from '../../components/userResults/UserResults';
import UsersResults from '../../components/usersResults/UsersResults';
import Button from '../../UI/button/Button';
import Loader from '../../UI/loader/Loader';

const UserProfile: FC = () => {
  const { stateUser, cookies, removeCookie } = useProfle();

  if (stateUser.isLoadingGetUser) return <Loader />;

  return (
    <>
      {cookies.user && (
        <div className={styles.container}>
          <div className={styles.userContainer}>
            <div className={styles.userInfo}>
              <h1>
                {stateUser.user.username}
                {stateUser.user.admin ? ' - администратор' : ''}
              </h1>
              <p className={styles.email}>{stateUser.user.email}</p>
            </div>
            <div className={styles.buttonContainer}>
              <a href={'/'}>
                <Button text={'Выйти'} onClick={() => removeCookie('user')} />
              </a>
            </div>
          </div>
          <div>
            <h2>
              <b>Результаты ваших тестов:</b>
            </h2>
            <UserResults userId={cookies.user} />
          </div>
          {stateUser.user.admin && (
            <div>
              <h2>
                <b>Результаты тестов пользователей:</b>
              </h2>
              <UsersResults />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserProfile;
