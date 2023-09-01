/* eslint-disable @typescript-eslint/no-unused-vars,
@typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable */
import {
  FC
} from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import styles from './ProjectCard.module.scss';
import { ProjectCardStatus } from './ProjectCardStatus/ProjectCardStatus';
import { ProjectCardOwner } from './ProjectCardOwner/ProjectCardOwner';
import { IconButton } from '../IconButton/IconButton';
import { ProjectCardMembers } from './ProjectCardMembers/ProjectCardMembers';
import { ProjectCardDescriptions } from './ProjectCardDescriptions/ProjectCardDescriptions';
// import { CompleteButton } from '../Buttons/CompleteButton/CompleteButton';
import { ProjectCardDate } from './ProjectCardDate/ProjectCardDate';
import { ProjectCardButton } from './ProjectCardButton/ProjectCardButton';
import { formatDate } from '../../helpers/helpers';
import edit from '../../svg/edit-pen--icon.svg';
import { User } from '../../Types/User';
import { ProjectCardFavorite } from './ProjectCardFavorite/ProjectCardFavorite';
import success from '../../svg/success-icon.svg';
import { Icon } from '../Icon/Icon';

type Props = {
  project: ProjectCardProps,
  onClick: (value: ProjectCardProps) => void,
  setEditProject: (event: React.MouseEvent, projectId: number) => void,
  onApply: (event: React.MouseEvent<HTMLButtonElement>, project: ProjectCardProps) => void,
  onFavorite: (value: string) => void,
};

export const ProjectCard: FC<Props> = ({
  project,
  onClick,
  setEditProject,
  onApply,
  onFavorite,
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
  const { userResponseDtos, maxMembers, requiredSpecialities } = teamResponseDto;

  const [currentUser] = useLocalStorage<User | null>('user', null);

  const isOwner = currentUser?.id === ownerId;
  const isApplied = userResponseDtos.some((member) => member.id === currentUser?.id);
  // const noSpecialityHas = requiredSpecialities.includes(currentUser?.speciality!);

  const formatedData = formatDate(creationDate);

  const projectOwner = teamResponseDto.userResponseDtos.find((user) => user.id === ownerId);

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

          <ProjectCardFavorite project={project} onFavorite={onFavorite}/>
        </div>
      </div>
      
      {projectOwner && (
        <ProjectCardOwner owner={projectOwner} />
      )}

      <ProjectCardMembers members={userResponseDtos.length} maxMembers={maxMembers} />

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
