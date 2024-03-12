import React, { FC } from 'react';
import styles from './LoginAndRegistration.module.scss';
import { useLogIn } from './logic/useLogIn';

const LogIn: FC = () => {
  const { error, username, setUsername, password, setPassword, handleChange } =
    useLogIn();

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
        <button className={styles.button} onClick={() => handleChange()}>
          OK
        </button>
        {error && <p className={styles.error}>Fill in all the fields!</p>}
      </div>
    </div>
  );
};

export default LogIn;
