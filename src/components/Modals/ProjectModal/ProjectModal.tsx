/* eslint-disable
@typescript-eslint/no-non-null-asserted-optional-chain,
no-mixed-operators */
import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { ProjectCardProps } from '../../../Types/ProjectCardProps';
import { ProjectCardStatus } from '../../projectCard/ProjectCardStatus/ProjectCardStatus';
import { ProjectCardOwner } from '../../projectCard/ProjectCardOwner/ProjectCardOwner';
import { ProjectCardMembers } from '../../projectCard/ProjectCardMembers/ProjectCardMembers';
import { ProjectCardDescriptions } from '../../projectCard/ProjectCardDescriptions/ProjectCardDescriptions';
import { ProjectCardMemberItem } from '../../projectCard/ProjectCardMemberItem/ProjectCardMemberItem';
import { ProjectCardComunaction } from '../../projectCard/ProjectCardComunaction/ProjectCardComunaction';
import { ProjectCardButton } from '../../projectCard/ProjectCardButton/ProjectCardButton';
import cross from '../../../svg/cross-icon.svg';
import './ProjectModal.scss';
import { IconButton } from '../../IconButton/IconButton';
import { ProjectCardDate } from '../../projectCard/ProjectCardDate/ProjectCardDate';
import { communications } from '../../../helpers/variables';
import { formatDate, getData } from '../../../helpers/helpers';
import { User } from '../../../Types/User';
import { ProjectCardFavorite } from '../../projectCard/ProjectCardFavorite/ProjectCardFavorite';
import success from '../../../svg/success-icon.svg';
import { Icon } from '../../Icon/Icon';
import { ProjectCardSpecializationItem } from '../../projectCard/ProjectCardSpecializationItem/ProjectCardSpecializationItem';
import { Request } from '../../../Types/Request';
import { ProjectCardRequest } from '../../projectCard/ProjectCardRequest/ProjectCardRequest';
import { LoaderSmall } from '../../Loader/LoaderSmall';
import edit from '../../../svg/edit-pen--icon.svg';
import remove from '../../../svg/delete-icon--red.png';

type Props = {
  project: ProjectCardProps,
  onApply: (event: React.MouseEvent<HTMLButtonElement>, project: ProjectCardProps) => void,
  onFavorite: (value: string) => void,
  onProjectModalClose: () => void,
  setEditProject: (event: React.MouseEvent, projectId: number) => void,
  removeHandler: (event: React.MouseEvent<HTMLButtonElement>, project: ProjectCardProps) => void,
};

export const ProjectModal: React.FC<Props> = ({
  project,
  onApply,
  onFavorite,
  onProjectModalClose,
  setEditProject,
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
    socialLink,
  } = project;

  const { userResponseDtos, maxMembers, requiredSpecialities } = teamResponseDto;
  const [currentUser] = useLocalStorage<User | null>('user', null);

  const [projectRequests, setProjectRequests] = useState<Request[]>([]);
  const [visibleRequests, setVisibleRequests] = useState<Request[]>([]);
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

  const formatedDate: string = formatDate(creationDate);

  const loadRequests = async () => {
    setIsLoader(true);

    try {
      const requests: any = await getData(`requests/by-project/${id}`);

      setProjectRequests(requests);

      setVisibleRequests([...requests].filter((request) => request.status === 'PENDING'));
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoader(false);
    }
  };

  const [requestSwitchCount, setRequestSwitchCount] = useState<number>(0);

  const requestSwitch = useCallback(() => {
    if (requestSwitchCount <= 2) {
      switch (requestSwitchCount) {
        case 0:
          setVisibleRequests([...projectRequests].filter((request) => request.status === 'PENDING'));
          break;

        case 1:
          setVisibleRequests([...projectRequests].filter((request) => request.status !== 'PENDING'));
          break;

        case 2:
          setVisibleRequests(projectRequests);
          break;

        default:
          break;
      }
    } else {
      setRequestSwitchCount(0);
    }
  }, [requestSwitchCount]);

  useEffect(() => {
    requestSwitch();
  }, [requestSwitchCount]);

  useEffect(() => {
    if (currentUser?.id === ownerId) {
      loadRequests();
    }
  }, []);

  return (
    <div className="projectModal">
      <div className="projectModal__top">
        <div className="projectModal__wrapper">
          <h1 className="projectModal__title">{name}</h1>
          <ProjectCardStatus status={status} />
        </div>

        <div className="projectModal__actions">
          <>
            {isLoader ? (
              <LoaderSmall />
            ) : (
              <>
                {currentUser && isOwner && (
                  <>
                    <IconButton
                      svg={edit}
                      onClick={(event) => setEditProject(event, id)}
                    />

                    <div className="projectModal__remove">
                      <IconButton
                        svg={remove}
                        onClick={(event) => removeHandler(event, project)}
                      />
                    </div>
                  </>
                )}

                <IconButton
                  svg={cross}
                  onClick={onProjectModalClose}
                />
              </>
            )}
          </>
        </div>
      </div>

      <ProjectCardOwner owner={projectOwner} />

      <div className="projectModal__specialization">
        <div>
          <ProjectCardMembers
            members={userResponseDtos.length}
            maxMembers={maxMembers}
          />

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
          <button
            type="button"
            onClick={() => setRequestSwitchCount((count) => count + 1)}
            className="projectModal__button"
          >
            <h1 className="projectModal__title-sub">Requests</h1>

            <div className="projectModal__arrows">

              {requestSwitchCount === 1 && (
                <div className="projectModal__arrows-up" />
              )}

              {requestSwitchCount === 0 && (
                <div className="projectModal__arrows-down" />
              )}

              {requestSwitchCount === 2 && (
                <>
                  <div className="projectModal__arrows-up" />
                  <div className="projectModal__arrows-down" />
                </>
              )}
            </div>
          </button>

          <ul className="projectModal__list">
            {visibleRequests.map((request) => (
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
