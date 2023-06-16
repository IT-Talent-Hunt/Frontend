import { FC, useState } from 'react';
import styles from './sideBar.module.scss';

export const SideBar: FC = () => {
  const [positions, setPositions] = useState<string[]>([]);
  const preMadePositions = ['Front-end developer', 'Back-end developer', 'Full-stack developer', 'DevOps', 'QA', 'Project Manager', 'UI/UX Designer'];

  const handleCheckbox = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const position = evt.target.name;

    if (positions.includes(position)) {
      setPositions(positions.filter((el) => el !== position));
    } else {
      setPositions([...positions, position]);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.heading__container}>
        <h4 className={styles.heading}>Filters</h4>
        <button type="button">Clear all</button>
      </div>
      <div className={styles.position__container}>
        <h4 className={styles.heading}>Position</h4>
        <ul className={styles.position__list}>
          {preMadePositions.map((el) => (
            <li key={el} className={styles.position__item}>
              <input
                type="checkbox"
                name={el.toLowerCase()}
                id={el.toLowerCase()}
                className={styles.checkbox}
                onChange={(evt) => handleCheckbox(evt)}
              />
              <label htmlFor={el.toLowerCase()} className={styles.label}>{el}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
