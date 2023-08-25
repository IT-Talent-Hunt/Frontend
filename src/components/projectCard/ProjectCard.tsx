/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable */
import {
  FC, useEffect, useRef, useState,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import styles from './ProjectCard.module.scss';
import heartEmpty from '../../svg/heartEmpty.svg';
import heartFull from '../../svg/heartFull.svg';
import { truncateText } from '../../helpers/truncateText';
import { ProjectCardStatus } from './ProjectCardStatus/ProjectCardStatus';
import { ProjectCardOwner } from './ProjectCardOwner/ProjectCardOwner';
import { IconButton } from '../IconButton/IconButton';
import { ProjectCardMembers } from './ProjectCardMembers/ProjectCardMembers';
import { ProjectCardDescriptions } from './ProjectCardDescriptions/ProjectCardDescriptions';
// import { CompleteButton } from '../Buttons/CompleteButton/CompleteButton';
import { ProjectCardDate } from './ProjectCardDate/ProjectCardDate';
import { ProjectCardButton } from './ProjectCardButton/ProjectCardButton';
import { deleteData, formatDate, putData } from '../../helpers/helpers';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import * as favoritesActions from '../../redux/features/favorites/favorites';
import edit from '../../svg/edit-pen--icon.svg';
import { User } from '../../Types/User';

type Props = {
  project: ProjectCardProps,
  onClick: (value: ProjectCardProps) => void,
  setEditProject: (event: React.MouseEvent, projectId: number) => void,
};

export const ProjectCard: FC<Props> = ({ project, onClick, setEditProject }) => {
  const {
    id,
    name,
    ownerId,
    status,
    teamResponseDto,
    description,
    creationDate,
  } = project;
  const { userResponseDtos, maxMembers } = teamResponseDto;

  const [currentUser] = useLocalStorage<User | null>('user', null);
  const [isEditVisible, setIsEditVisible] = useState<boolean>(false);

  const shortDescp = truncateText(description, 120);

  const formatedData = formatDate(creationDate);

  const dispatch = useAppDispatch();
  const { favorites, favoritesLoading, favoritesError } = useAppSelector(state => state.favorites);

  const isFavorite = favorites.some((fav) => fav.id === project.id);

  const handleApplyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent click event from bubbling up to the card
  };

  const handleFavoritesAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent click event from bubbling up to the card

    dispatch(favoritesActions.push(project.id));
    dispatch(favoritesActions.add(project));
    // return putData(`liked-carts/projects/${project.id}`, null);
  };

  const handleFavoritesRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent click event from bubbling up to the card

    dispatch(favoritesActions.remove(project.id));
    dispatch(favoritesActions.take(project));

    // return deleteData(`liked-carts/projects/${project.id}`);
  };

  const projectOwner = teamResponseDto.userResponseDtos.find((user) => user.id === ownerId)
    || teamResponseDto.userResponseDtos[0];

  return (
    /* The <div> element has a child <button> element that allows keyboard interaction */
    /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
    <div
      className={styles.card}
      onClick={() => onClick(project)}
      onKeyDown={() => { }}
    >
      <div className={styles.heading}>
        <div className={styles.heading__container}>
          <h2 className={styles.title}>{name}</h2>
          <ProjectCardStatus status={status} />
        </div>

        {/* must be added is favorite in early future */}

        <div className={styles.icons}>
          {isFavorite ? (
            <IconButton svg={heartFull} onClick={handleFavoritesRemove} />
          ) : (
            <IconButton svg={heartEmpty} onClick={handleFavoritesAdd} />
          )}

          {currentUser && currentUser.id === ownerId && (
            <IconButton
              svg={edit}
              onClick={(event) => setEditProject(event, id ? id : 0)}
            />
          )}
        </div>
      </div>

      <ProjectCardOwner owner={projectOwner} />

      <ProjectCardMembers members={userResponseDtos.length} maxMembers={maxMembers} />

      <ProjectCardDescriptions description={description} />

      <div className={styles.footer}>
        <ProjectCardButton
          title="Apply"
          onClick={(event: any) => event.stopPropagation()}
        />

        <ProjectCardDate date={formatedData} />
      </div>
    </div>
  );
};
