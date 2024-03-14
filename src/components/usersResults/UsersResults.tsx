import React from 'react';
import styles from './UsersResults.module.scss';
import { useUsersResults } from './logic/useUsersResults';
import UserResults from '../userResults/UserResults';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UsersResults = () => {
  const { stateUser } = useUsersResults();

  return (
    <>
      {stateUser.users.map((user) => (
        <div key={user.id}>
          <div className={styles.username}>
            <FontAwesomeIcon icon={faUser} />
            <h2>{user.username}</h2>
          </div>
          <UserResults userId={user.id} />
        </div>
      ))}
    </>
  );
};

export default UsersResults;
