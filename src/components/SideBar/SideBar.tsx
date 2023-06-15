import { FC } from 'react';
import styles from './sideBar.module.scss';

export const SideBar: FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.heading__container}>
        <h4 className={styles.heading}>Filters</h4>
        <button type="button">Clear all</button>
      </div>
    </div>
  );
};
