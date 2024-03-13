import React, { FC } from 'react';
import styles from './UserProfile.module.scss';
import { useUserPrtofle } from './logic/useUserProfile';

const UserProfile: FC = () => {
  const { stateUser } = useUserPrtofle();
  return (<div></div>)
}

export default UserProfile;