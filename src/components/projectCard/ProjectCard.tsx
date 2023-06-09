/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FC, useEffect, useRef, useState,
} from 'react';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import styles from './ProjectCard.module.scss';
import favorite from '../../svg/heartEmpty.svg';
import { truncateText } from '../../helpers/truncateText';

interface Props extends ProjectCardProps {
  id: number;
  onClick: (id: number) => void;
}

export const ProjectCard: FC<Props> = (
  {
    id,
    title,
    owner,
    status,
    members,
    maxMembers,
    description,
    creationDate,
    isFavorite,
    onClick,
  },
) => {
  const shortDescp = truncateText(description, 120);

  const handleApplyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent click event from bubbling up to the card
  };

  const handleFavoritesClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent click event from bubbling up to the card
  };

  return (
    /* The <div> element has a child <button> element that allows keyboard interaction */
    /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
    <div className={styles.card} onClick={() => onClick(id)} onKeyDown={() => { }}>
      <div className={styles.heading}>
        <div className={styles.heading__container}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.status}>{status}</div>
        </div>
        <button
          type="button"
          className={styles.favorite}
          style={{
            backgroundImage: isFavorite
              ? `url(${favorite})`
              : `url(${favorite})`,
          }}
          onClick={handleFavoritesClick}
        >
        </button>
      </div>
      <div className={styles.owner}>
        <h5 className={styles.owner__name}>{owner}</h5>
      </div>
      <div className={styles.members}>
        <div className={styles.members__icon} />
        {`${members}/${maxMembers} members`}
      </div>
      <p className={styles.description}>{shortDescp}</p>
      <div className={styles.footer}>
        <button type="button" className={styles.btn} onClick={handleApplyClick}>
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
