import React from 'react';
import { useUsersResults } from './logic/useUserResults';

const UsersResults = () => {
  const { stateUser } = useUsersResults();

  return (
    <div>
      {stateUser.users.map((user) => (
        <p key={user.id}>{user.username}</p>
      ))}
    </div>
  );
};

export default UsersResults;
