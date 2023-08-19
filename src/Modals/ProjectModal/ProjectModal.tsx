import { useContext } from 'react';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import { ProjectCardStatus } from '../../components/projectCard/ProjectCardStatus/ProjectCardStatus';
import { ProjectCardOwner } from '../../components/projectCard/ProjectCardOwner/ProjectCardOwner';
import { ProjectCardMembers } from '../../components/projectCard/ProjectCardMembers/ProjectCardMembers';
import { ProjectCardDescriptions } from '../../components/projectCard/ProjectCardDescriptions/ProjectCardDescriptions';
import { ProjectCardMemberItem } from '../../components/projectCard/ProjectCardMemberItem/ProjectCardMemberItem';
import { ProjectCardComunaction } from '../../components/projectCard/ProjectCardComunaction/ProjectCardComunaction';
import { ProjectCardButton } from '../../components/projectCard/ProjectCardButton/ProjectCardButton';
import { ModalContext } from '../../Providers/ModalProvider';
import favorite from '../../svg/heartEmpty.svg';
import cross from '../../svg/cross-icon.svg';
import './ProjectModal.scss';
import { IconButton } from '../../components/IconButton/IconButton';
import { ProjectCardDate } from '../../components/projectCard/ProjectCardDate/ProjectCardDate';
import { communications } from '../../helpers/Variables';
import { formatDate } from '../../helpers/helpers';

type Props = {
  project: ProjectCardProps,
};

export const ProjectModal: React.FC<Props> = ({ project }) => {
  const {
    name,
    ownerId,
    status,
    teamResponseDto,
    description,
    creationDate,
    socialLink,
  } = project;

  const { userResponseDtos, maxMembers } = teamResponseDto;

  const projectOwner = userResponseDtos
    .find((user) => user.id === ownerId)
    || userResponseDtos[0];

  const { setIsModal } = useContext(ModalContext);

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
          <h1>{name}</h1>
          <ProjectCardStatus status={status} />
        </div>

        <IconButton svg={cross} onClick={() => setIsModal(false)} />
      </div>

      <ProjectCardOwner owner={projectOwner} />
      <ProjectCardMembers members={userResponseDtos.length} maxMembers={maxMembers} />

      <ul className="projectModal__list">
        {userResponseDtos.map((member) => (
          <ProjectCardMemberItem
            key={member.id}
            member={member}
          />
        ))}
      </ul>

      <p className="projectModal__container">
        <h2>Description</h2>
        <ProjectCardDescriptions description={description} isModal={!!true} />
      </p>

      <p className="projectModal__container">
        <h2>Comunication</h2>
        <ProjectCardComunaction comunication={communication} />
      </p>

      <div className="projectModal__bottom">
        <div>
          <ProjectCardButton title="Apply" />
          <IconButton svg={favorite} />
        </div>

        <ProjectCardDate date={formatedDate} />
      </div>
    </div>
  );
};
