import React, { FC } from 'react';
import styles from './InfoPage.module.scss';
import logo from '../../img/logoPenzGTU.png';

const InfoPage: FC = () => {
  return (
    <div className={styles.container}>
      <img src={logo} alt={'logo'} />
      <h2 className={styles.text}>
        WEB - ресурс для обучения и проверки знаний военнослужащих по военным
        специальностям
      </h2>
      <h2 className={styles.text}>
        Разработал Ладыгин Всеволод Львович студент 19СН1с
      </h2>
    </div>
  );
};

export default InfoPage;
