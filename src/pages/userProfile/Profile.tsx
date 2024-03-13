import React, { FC } from 'react';
import styles from './Profile.module.scss';
import { useProfle } from './logic/useProfile';
import UserResults from '../../components/userResults/UserResults';
import UsersResults from '../../components/usersResults/UsersResults';

const UserProfile: FC = () => {
  const { stateUser } = useProfle();

  return (
    <div className={styles.container}>
      <h2>
        <b>Результаты пройденых тестов:</b>
      </h2>
      {!stateUser.user.admin && <UserResults />}
      {stateUser.user.admin && <UsersResults />}
    </div>
  );
};

export default UserProfile;
