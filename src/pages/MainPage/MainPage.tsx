import { FC } from 'react';
import styles from './MainPage.module.scss';
import { SideBar } from '../../components/SideBar/SideBar';

export const MainPage: FC = () => {
  return (
    <div className={styles.main}>
      <SideBar />
    </div>
  );
};
