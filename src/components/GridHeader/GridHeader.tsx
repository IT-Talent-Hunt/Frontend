import { FC, useState } from 'react';
import styles from './GridHeader.module.scss';

type Props = {
  n: number;
  position: string;
};

export const GridHeader: FC<Props> = ({ n = 0, position }) => {
  const [filter, setFilter] = useState('all');
  const filters = ['All', 'New', 'Favorites'];

  return (
    <div className={styles.header}>
      <h5 className={styles.heading}>
        {`${n} projects was found for`}
        <p className={styles.accented_text}>
          {position || ' your filters'}
        </p>
      </h5>
      <ul className={styles.list__container}>
        {filters.map((el) => (
          <li key={el} className={styles.list__item}>
            <input
              type="radio"
              name="filterOptions"
              id={el.toLowerCase()}
              value={el.toLowerCase()}
              checked={filter === el.toLowerCase()}
              onChange={(evt) => setFilter(evt.target.value)}
              className={styles.radio}
              data-content={el}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
