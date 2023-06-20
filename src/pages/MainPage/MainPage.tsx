import { FC } from 'react';
import styles from './MainPage.module.scss';
import { SideBar } from '../../components/SideBar/SideBar';
import { GridHeader } from '../../components/GridHeader/GridHeader';

export const MainPage: FC = () => {
  return (
    <div className={styles.main}>
      <SideBar />
      <div className={styles.grid__container}>
        <GridHeader n={24} position="" />
      </div>
    </div>
  );
};
