import React from 'react';
import { useUsersResults } from './logic/useUserResults';

const UsersResults = () => {
  const { stateUser, stateMain } = useUsersResults();

  return (
    <div>
      {stateUser.users.map((user) => (
        <>
          <h2 key={user.id}>{user.username}</h2>
          {stateMain.chapters.map((chapter) => (
            <>
              <p key={chapter.id}>{chapter.chapter}</p>
            </>
          ))}
        </>
      ))}
    </div>
  );
};

export default UsersResults;
