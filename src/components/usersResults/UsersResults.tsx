import React from 'react';
import styles from './UsersResults.module.scss';
import { useUsersResults } from './logic/useUsersResults';
import UserResults from '../userResults/UserResults';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UsersResults = () => {
  const { stateUser, cookies } = useUsersResults();

  return (
    <div className={styles.container}>
      {stateUser.users
        .filter((user) => user.id !== cookies.user)
        .map((user) => (
          <div key={user.id} className={styles.item}>
            <div className={styles.username}>
              <FontAwesomeIcon icon={faUser} />
              <h2>{user.username}</h2>
            </div>
            <UserResults userId={user.id} />
          </div>
        ))}
    </div>
  );
};

export default UsersResults;
