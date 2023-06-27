import { FC } from 'react';
import styles from './PositionItem.module.scss';

export const PositionItem: FC = () => {
  return (
    <div className={styles.position}>
      Select, Add, Cancel
    </div>
  );
};
