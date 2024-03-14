import React from 'react';
import { useUsersResults } from './logic/useUsersResults';
import UserResults from '../userResults/UserResults';

const UsersResults = () => {
  const { stateUser } = useUsersResults();

  return (
    <>
      {stateUser.users.map((user) => (
        <div key={user.id}>
          <h2>{user.username}</h2>
          <UserResults userId={user.id} />
        </div>
      ))}
    </>
  );
};

export default UsersResults;
