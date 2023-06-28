import { ChangeEvent, FC, useState } from 'react';
import styles from './PositionItem.module.scss';

type Props = {
  handleClickPlus: () => void,
  updateMembers: (position: string) => void
};

export const PositionItem: FC<Props> = ({ handleClickPlus, updateMembers }) => {
  const [position, setPosition] = useState('UI/UX designer');

  const handleChangePosition = (event: ChangeEvent<HTMLSelectElement>) => {
    setPosition(event.target.value);
  };

  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault();
    handleClickPlus();
    updateMembers(position);
  };

  const handleCancel = async (event: React.FormEvent) => {
    event.preventDefault();
    handleClickPlus();
  };

  return (
    <div className={styles.position}>
      <div>
        <label htmlFor="communication" className={styles.position__label}>
          Position
        </label>
        <select
          name="select"
          className={styles.position__select}
          value={position}
          onChange={handleChangePosition}
        >
          <option value="UI/UX designer">UI/UX designer</option>
          <option value="Front-end developer">Front-end developer</option>
          <option value="Back-end developer">Back-end developer</option>
          <option value="QA engineer">QA engineer</option>
          <option value="Project-manager">Project-manager</option>
          <option value="DevOps">DevOps</option>
          <option value="Mentor">Mentor</option>
        </select>
      </div>

      <button
        className={`${styles.position__button} ${styles.position__buttonAdd}`}
        type="button"
        onClick={handleAdd}
      >
        Add
      </button>
      <button
        className={`${styles.position__button} ${styles.position__buttonCancel}`}
        type="button"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </div>
  );
};
