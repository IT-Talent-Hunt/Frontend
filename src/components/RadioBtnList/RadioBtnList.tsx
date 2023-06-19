import { FC } from 'react';
import styles from './RadioBtnList.module.scss';

type Props = {
  list: string[];
  state: string;
  heading: string;
  groupName: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

export const RadioBtnList: FC<Props> = ({
  list, state, heading, groupName, setState,
}) => {
  return (
    <div className={styles.list}>
      <h4 className={styles.heading}>{heading}</h4>
      <ul className={styles.list__ul}>
        {list.map((el) => (
          <li key={el} className={styles.list__item}>
            <input
              type="radio"
              name={groupName}
              id={el.toLowerCase()}
              value={el.toLowerCase()}
              checked={state === el.toLowerCase()}
              onChange={(evt) => setState(evt.target.value)}
              className={styles.radio}
              data-content={el.toLowerCase()}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
