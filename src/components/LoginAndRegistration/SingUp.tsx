import React, { FC } from 'react';
import { useState } from 'react';
import styles from './LoginAndRegistration.module.scss';
import { User, UserSignUp } from '../../app/types';
import { v4 as uuidv4 } from 'uuid';
// import { createUser } from '@/services/requests';
// import { setCookie } from 'cookies-next';

// type SignUpProps = {
//   signUpActive: boolean;
//   closeSignUpWindow: Function;
// }

const SignUp: FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const user: User = {
    id: uuidv4.toString(),
    email: email,
    username: username,
    password: password,
  };

  console.log(user);

  const handleChange = async (user: UserSignUp | undefined) => {
    if (
      email !== '' &&
      username !== '' &&
      password !== '' &&
      user !== undefined
    ) {
      setError(false);
      // const data = await createUser(user);
      // setCookie('user', data?.userData?.id, { maxAge: 259200 });
      // setCookie('cart', data?.cartData?.id, { maxAge: 259200 });
      // closeSignUpWindow(false);
    } else {
      setError(true);
    }
  };

  // if (signUpActive === false) return null;

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div
          className={styles.close}
          // onClick={() => closeSignUpWindow(false)}
        >
          Close
        </div>
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
        <button className={styles.button} onClick={() => handleChange(user)}>
          OK
        </button>
        {error && <p className={styles.error}>Fill in all the fields!</p>}
      </div>
    </div>
  );
};

export default SignUp;
