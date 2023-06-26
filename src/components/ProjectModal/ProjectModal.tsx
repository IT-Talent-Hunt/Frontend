import { FC } from 'react';
import styles from './ProjectModal.module.scss';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import favorite from '../../svg/heartEmpty.svg';

export const ProjectModal: FC<ProjectCardProps> = ({
  title,
  owner,
  status,
  members,
  maxMembers,
  description,
  creationDate,
  isFavorite,
}) => {
  return (
    <div className={styles.modal}>
      <div className={styles.heading}>
        <div className={styles.heading__container}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.status}>{status}</div>
        </div>
        <div
          className={styles.favorite}
          style={{
            backgroundImage: isFavorite
              ? `url(${favorite})`
              : `url(${favorite})`,
          }}
        >
        </div>
      </div>
      <div className={styles.owner}>
        <h5 className={styles.owner__name}>{owner}</h5>
      </div>
      <div className={styles.members}>
        <div className={styles.members__icon} />
        {`${members}/${maxMembers} members`}
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.footer}>
        <button type="button" className={styles.btn}>
          Apply
        </button>
        <div className={styles.date__container}>
          <div className={styles.calendar__icon} />
          {creationDate}
        </div>
      </div>
    </div>
  );
};
