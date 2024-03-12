import React, { FC } from 'react';
import styles from './LoginAndRegistration.module.scss';
import { useSignUp } from './logic/useSignUp';

const SignUp: FC = () => {
  const {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleChange,
  } = useSignUp();

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.close}>Close</div>
        <p className={styles.title}>Sing up</p>
        <input
          type="text"
          placeholder="Email"
          name="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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

export default SignUp;
