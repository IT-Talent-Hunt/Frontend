import { FC } from 'react';
import styles from './CheckBoxList.module.scss';

type Props = {
  list: string[];
  callbackFn: (
    evt: React.ChangeEvent<HTMLInputElement>,
    stateType: 'position' | 'status'
  ) => void;
  stateType: 'position' | 'status';
  heading: string;
  state: string[];
};

export const CheckBoxList: FC<Props> = ({
  list, callbackFn, stateType, heading, state,
}) => {
  return (
    <div className={styles.list}>
      <h4 className={styles.heading}>{heading}</h4>
      <ul className={styles.list__ul}>
        {list.map((el) => (
          <li key={el} className={styles.list__item}>
            <input
              type="checkbox"
              checked={state.includes(el)}
              name={el}
              id={el.toLowerCase()}
              className={styles.checkbox}
              onChange={(evt) => callbackFn(evt, stateType)}
            />
            <label htmlFor={el.toLowerCase()} className={styles.label}>
              {el}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
