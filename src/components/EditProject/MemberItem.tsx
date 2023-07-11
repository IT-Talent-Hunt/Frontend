import { FC } from 'react';
import styles from './MemberItem.module.scss';

interface Person {
  name: string;
  role: string;
  id: number;
}

type Props = {
  member: Person;
  removeMember: (id: number) => Promise<void>,
};

export const MemberItem: FC<Props> = ({ member, removeMember }) => {
  const {
    name,
    role,
    id,
  } = member;

  const handleKick = () => {
    removeMember(id);
  };

  return (
    <div className={styles.member}>
      <span className={styles.role}>{role}</span>
      <span className={styles.name}>{name}</span>
      <button type="button" className={styles.kickButton} onClick={handleKick}>
        Kick
      </button>
    </div>
  );
};
