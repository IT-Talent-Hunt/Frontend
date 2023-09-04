/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
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
import { formatDate } from '../../helpers/helpers';
import { User } from '../../Types/User';
import { ProjectCardFavorite } from '../../components/projectCard/ProjectCardFavorite/ProjectCardFavorite';
import success from '../../svg/success-icon.svg';
import { Icon } from '../../components/Icon/Icon';
import { ProjectCardSpecializationItem } from '../../components/projectCard/ProjectCardSpecializationItem/ProjectCardSpecializationItem';

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

  const projectOwner = userResponseDtos
    .find((user) => user.id === ownerId)
    || userResponseDtos[0];

  const isOwner = currentUser?.id === ownerId;
  const isApplied = userResponseDtos.some((member) => member.id === currentUser?.id);
  // const noSpecialityHas = requiredSpecialities.includes(currentUser?.speciality!);

  // const selectedSocialLink = socialLinks.filter((socialLink) => socialLink.url.length > 0)[0];

  const communication = communications
    .find((com) => com.name === socialLink.platform)
    || communications[0];

  communication.link = socialLink.url;

  const formatedDate = formatDate(creationDate);

  /* eslint-disable-next-line */
  console.log(communication);

  return (
    <div className="projectModal">
      <div className="projectModal__top">
        <div className="projectModal__wrapper">
          <h1 className="projectModal__title">{name}</h1>
          <ProjectCardStatus status={status} />
        </div>

        <IconButton svg={cross} onClick={onProjectModalClose} />
      </div>

      <ProjectCardOwner owner={projectOwner} />

      <div className="projectModal__specialization">
        <div>
          <ProjectCardMembers members={userResponseDtos.length} maxMembers={maxMembers} />

          <ul className="projectModal__list">
            {userResponseDtos.map((member) => (
              <ProjectCardMemberItem
                key={member.id}
                member={member}
              />
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
