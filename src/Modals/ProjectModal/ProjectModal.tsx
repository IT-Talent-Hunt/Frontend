/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import { ProjectCardStatus } from '../../components/projectCard/ProjectCardStatus/ProjectCardStatus';
import { ProjectCardOwner } from '../../components/projectCard/ProjectCardOwner/ProjectCardOwner';
import { ProjectCardMembers } from '../../components/projectCard/ProjectCardMembers/ProjectCardMembers';
import { ProjectCardDescriptions } from '../../components/projectCard/ProjectCardDescriptions/ProjectCardDescriptions';
import { ProjectCardMemberItem } from '../../components/projectCard/ProjectCardMemberItem/ProjectCardMemberItem';
import { ProjectCardComunaction } from '../../components/projectCard/ProjectCardComunaction/ProjectCardComunaction';
import { ProjectCardButton } from '../../components/projectCard/ProjectCardButton/ProjectCardButton';
import cross from '../../svg/cross-icon.svg';
import './ProjectModal.scss';
import { IconButton } from '../../components/IconButton/IconButton';
import { ProjectCardDate } from '../../components/projectCard/ProjectCardDate/ProjectCardDate';
import { communications } from '../../helpers/Variables';
import { formatDate, getData } from '../../helpers/helpers';
import { User } from '../../Types/User';
import { ProjectCardFavorite } from '../../components/projectCard/ProjectCardFavorite/ProjectCardFavorite';
import success from '../../svg/success-icon.svg';
import { Icon } from '../../components/Icon/Icon';
import { ProjectCardSpecializationItem } from '../../components/projectCard/ProjectCardSpecializationItem/ProjectCardSpecializationItem';
import { Request } from '../../Types/Request';
import { ProjectCardRequest } from '../../components/projectCard/ProjectCardRequest/ProjectCardRequest';
import { LoaderSmall } from '../../components/Loader/LoaderSmall';

type Props = {
  project: ProjectCardProps,
  onApply: (event: React.MouseEvent<HTMLButtonElement>, project: ProjectCardProps) => void,
  onFavorite: (value: string) => void,
  onProjectModalClose: () => void,
};

export const ProjectModal: React.FC<Props> = ({
  project,
  onApply,
  onFavorite,
  onProjectModalClose,
}) => {
  const {
    id,
    name,
    ownerId,
    status,
    teamResponseDto,
    description,
    creationDate,
    socialLink,
  } = project;

  const { userResponseDtos, maxMembers, requiredSpecialities } = teamResponseDto;
  const [currentUser] = useLocalStorage<User | null>('user', null);

  const [projectRequests, setProjectRequests] = useState<Request[]>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const projectOwner = userResponseDtos
    .find((user) => user.id === ownerId)
    || userResponseDtos[0];

  const isOwner = currentUser?.id === ownerId;
  const isApplied = userResponseDtos.some((member) => member.id === currentUser?.id);

  const communication = communications
    .find((com) => com.name === socialLink.platform)
    || communications[0];

  communication.link = socialLink.url;

  const formatedDate = formatDate(creationDate);

  const loadRequests = async () => {
    setIsLoader(true);

    try {
      const requests: any = await getData(`requests/by-project/${id}`);

      setProjectRequests(requests);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    if (currentUser?.id === ownerId) {
      loadRequests();
    }
  }, []);

  /* eslint-disable-next-line */
  console.log(projectRequests);

  return (
    <div className="projectModal">
      <div className="projectModal__top">
        <div className="projectModal__wrapper">
          <h1 className="projectModal__title">{name}</h1>
          <ProjectCardStatus status={status} />
        </div>

        <div className="projectModal__actions">
          {isLoader && (
            <LoaderSmall />
          )}
          <IconButton svg={cross} onClick={onProjectModalClose} />
        </div>
      </div>

      <ProjectCardOwner owner={projectOwner} />

      <div className="projectModal__specialization">
        <div>
          <ProjectCardMembers members={userResponseDtos.length} maxMembers={maxMembers} />

          <ul className="projectModal__list">
            {userResponseDtos.map((member) => (
              <li key={member.id} className="projectModal__member">
                <ProjectCardMemberItem
                  key={member.id}
                  member={member}
                />

                <p className="projectModal__member-position">
                  {member.speciality}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {!!requiredSpecialities.length && (
          <div>
            <h1 className="projectModal__specialization-title">Required specialties</h1>

            <ul className="projectModal__list">
              {requiredSpecialities.map((position) => (
                <ProjectCardSpecializationItem key={position} position={position} />
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="projectModal__container">
        <h1 className="projectModal__title-sub">Description</h1>
        <ProjectCardDescriptions description={description} isModal={!!true} />
      </div>

      {currentUser?.id === ownerId && !!projectRequests.length && !isError && (
        <div className="projectModal__container">
          <h1 className="projectModal__title-sub">Requests</h1>

          <ul className="projectModal__list">
            {projectRequests.map((request) => (
              <ProjectCardRequest key={request.id} request={request} />
            ))}
          </ul>
        </div>
      )}

      <div className="projectModal__container">
        <h1 className="projectModal__title-sub">Comunication</h1>
        <ProjectCardComunaction comunication={communication} />
      </div>

      <div className="projectModal__bottom">
        <div className="projectModal__buttons">
          {!isOwner && (
            <div className="projectModal__buttons-apply">
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

          <ProjectCardFavorite project={project} onFavorite={onFavorite} />
        </div>

        <ProjectCardDate date={formatedDate} />
      </div>
    </div>
  );
};
