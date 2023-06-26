/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from 'react';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import styles from './ProjectCard.module.scss';
import favorite from '../../svg/heartEmpty.svg';
import { truncateText } from '../../helpers/truncateText';

export const ProjectCard: FC<ProjectCardProps> = (
  {
    title,
    owner,
    status,
    members,
    maxMembers,
    description,
    creationDate,
    isFavorite,
  },
) => {
  const [showModal, setShowModal] = useState(false);
  const shortDescp = truncateText(description, 120);

  const handleCardClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    const target = evt.target as HTMLDivElement;
    const hasCardClass = target.classList.contains(styles.card);

    if (hasCardClass) {
      setShowModal(true);
    }
  };

  return (
    /* The <div> element has a child <button> element that allows keyboard interaction */
    /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
    <div className={styles.card} onClick={handleCardClick} onKeyDown={() => {}}>
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
      <p className={styles.description}>
        {shortDescp}
      </p>
      <div className={styles.footer}>
        <button type="button" className={styles.btn}>Apply</button>
        <div className={styles.date__container}>
          <div className={styles.calendar__icon} />
          {creationDate}
        </div>
      </div>
    </div>
  );
};
