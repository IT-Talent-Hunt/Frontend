/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FC, useEffect, useRef, useState,
} from 'react';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import styles from './ProjectCard.module.scss';
import favorite from '../../svg/heartEmpty.svg';
import { truncateText } from '../../helpers/truncateText';
import { ProjectCardStatus } from './ProjectCardStatus/ProjectCardStatus';
import { ProjectCardOwner } from './ProjectCardOwner/ProjectCardOwner';
import { IconButton } from '../IconButton/IconButton';
import { ProjectCardMembers } from './ProjectCardMembers/ProjectCardMembers';
import { ProjectCardDescriptions } from './ProjectCardDescriptions/ProjectCardDescriptions';
import { CompleteButton } from '../Buttons/CompleteButton/CompleteButton';
import { ProjectCardDate } from './ProjectCardDate/ProjectCardDate';
import { ProjectCardButton } from './ProjectCardButton/ProjectCardButton';

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
    <div className={styles.card} onClick={(event) => onClick(id)} onKeyDown={() => { }}>
      <div className={styles.heading}>
        <div className={styles.heading__container}>
          <h2 className={styles.title}>{title}</h2>
          <ProjectCardStatus status={status} />
        </div>

        {isFavorite ? (
          <IconButton svg={favorite} onClick={handleFavoritesClick} />
        ) : (
          <IconButton svg={favorite} onClick={handleFavoritesClick} />
        )}

      </div>

      <ProjectCardOwner owner={owner} />

      <ProjectCardMembers members={members.length} maxMembers={maxMembers} />

      <ProjectCardDescriptions description={description} />

      <div className={styles.footer}>
        <ProjectCardButton title="Apply" />

        <ProjectCardDate date={creationDate} />
      </div>
    </div>
  );
};
