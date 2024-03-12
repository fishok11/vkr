import React, { FC } from 'react';
import { useState } from 'react';
import styles from './LoginAndRegistration.module.scss';
import { UserLogIn } from '../../app/types';
// import { logInUser } from '@/services/requests';
// import {  } from 'react-cookie';

// type LogInProps = {
//   logInActive: boolean;
//   closeLogInWindow: Function;
// }

const LogIn: FC = () => {
  const [error, setError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const user: UserLogIn = {
    username: username,
    password: password,
  };

  const handleChange = async (user: UserLogIn | undefined) => {
    if (username !== '' && password !== '' && user !== undefined) {
      setError(false);
      // const data = await logInUser(user);
      // setCookie('user', data?.userData?.id, { maxAge: 259200 });
      // setCookie('cart', data?.cartId, { maxAge: 259200 });
      // closeLogInWindow(false);
    } else {
      setError(true);
    }
  };

  // if (logInActive === false) return null;

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div
          className={styles.close}
          // onClick={() => closeLogInWindow(false)}
        >
          Close
        </div>
        <p className={styles.title}>Log in</p>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} onClick={() => handleChange(user)}>
          OK
        </button>
        {error && <p className={styles.error}>Fill in all the fields!</p>}
      </div>
    </div>
  );
};

export default LogIn;
