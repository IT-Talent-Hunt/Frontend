import { FC } from 'react';
import { FiltersEnumTypes } from '../../Types/FilterEnumTypes';
import styles from './GridHeader.module.scss';

type Props = {
  n: number;
  position: string;
  filter: string,
  setFilter: (value: FiltersEnumTypes) => void,
};

export const GridHeader: FC<Props> = ({
  n = 0,
  position,
  filter,
  setFilter,
}) => {
  return (
    <div className={styles.header}>
      <h5 className={styles.heading}>
        {`${n} projects was found for`}
        &nbsp;

        {position.length ? (
          <p className={styles.accented_text}>
            {position}
          </p>
        ) : (
          <p className={styles.accented_text}>
            your filters
          </p>
        )}
      </h5>
      <ul className={styles.list__container}>
        <li className={styles.list__item}>
          <input
            type="radio"
            name="filterOptions"
            id={FiltersEnumTypes.ALL}
            value={FiltersEnumTypes.ALL}
            checked={filter === FiltersEnumTypes.ALL}
            onChange={() => setFilter(FiltersEnumTypes.ALL)}
            className={styles.radio}
            data-content="All"
          />
        </li>

        <li className={styles.list__item}>
          <input
            type="radio"
            name="filterOptions"
            id={FiltersEnumTypes.NEW}
            value={FiltersEnumTypes.NEW}
            checked={filter === FiltersEnumTypes.NEW}
            onChange={() => setFilter(FiltersEnumTypes.NEW)}
            className={styles.radio}
            data-content="New"
          />
        </li>

        <li className={styles.list__item}>
          <input
            type="radio"
            name="filterOptions"
            id={FiltersEnumTypes.FAVORITES}
            value={FiltersEnumTypes.FAVORITES}
            checked={filter === FiltersEnumTypes.FAVORITES}
            onChange={() => setFilter(FiltersEnumTypes.FAVORITES)}
            className={styles.radio}
            data-content="Favorites"
          />
        </li>
      </ul>
    </div>
  );
};
