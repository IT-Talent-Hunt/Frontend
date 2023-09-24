/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  FC, useMemo,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import styles from './ProjectCard.module.scss';
import { ProjectCardStatus } from './ProjectCardStatus/ProjectCardStatus';
import { ProjectCardOwner } from './ProjectCardOwner/ProjectCardOwner';
import { IconButton } from '../IconButton/IconButton';
import { ProjectCardMembers } from './ProjectCardMembers/ProjectCardMembers';
import { ProjectCardDescriptions } from './ProjectCardDescriptions/ProjectCardDescriptions';
import { ProjectCardDate } from './ProjectCardDate/ProjectCardDate';
import { ProjectCardButton } from './ProjectCardButton/ProjectCardButton';
import { formatVisibleDate } from '../../helpers/helpers';
import edit from '../../svg/edit-pen--icon.svg';
import { User } from '../../Types/User';
import { ProjectCardFavorite } from './ProjectCardFavorite/ProjectCardFavorite';
import success from '../../svg/success-icon.svg';
import remove from '../../svg/delete-icon--red.png';
import { Icon } from '../Icon/Icon';

type Props = {
  project: ProjectCardProps,
  onClick: (value: ProjectCardProps) => void,
  setEditProject: (event: React.MouseEvent, projectId: number) => void,
  onApply: (event: React.MouseEvent<HTMLButtonElement>, project: ProjectCardProps) => void,
  onFavorite: (value: string) => void,
  removeHandler: (event: React.MouseEvent<HTMLButtonElement>, project: ProjectCardProps) => void,
};

export const ProjectCard: FC<Props> = ({
  project,
  onClick,
  setEditProject,
  onApply,
  onFavorite,
  removeHandler,
}) => {
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

  const isOwner = useMemo(() => currentUser?.id === ownerId, [project]);
  const isApplied = useMemo(() => userResponseDtos
    .some((member) => member.id === currentUser?.id), [project]);

  const formatedData = useMemo(() => formatVisibleDate(creationDate), [project]);

  const projectOwner = useMemo(() => teamResponseDto.userResponseDtos
    .find((user) => user.id === ownerId), [project]);

  return (
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

        <div className={styles.icons}>
          {currentUser && isOwner && (
            <IconButton
              svg={edit}
              onClick={(event) => setEditProject(event, id)}
            />
          )}

          <ProjectCardFavorite project={project} onFavorite={onFavorite} />

          {currentUser && isOwner && (
            <div className={styles.remove}>
              <IconButton
                svg={remove}
                onClick={(event) => removeHandler(event, project)}
              />
            </div>
          )}

        </div>
      </div>

      {projectOwner && (
        <ProjectCardOwner owner={projectOwner} />
      )}

      <ProjectCardMembers
        members={userResponseDtos.length}
        maxMembers={maxMembers}
      />

      <ProjectCardDescriptions description={description} />

      <div className={styles.footer}>
        {!isOwner && (
          <div className={styles.buttons}>
            <ProjectCardButton
              title="Apply"
              onClick={(event) => onApply(event, project)}
              isDisabled={!isApplied}
            />

            {isApplied && (
              <Icon icon={success} />
            )}
          </div>
        )}

        <ProjectCardDate date={formatedData} />
      </div>
    </div>
  );
};
