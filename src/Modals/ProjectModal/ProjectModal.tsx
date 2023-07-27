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

type Props = {
  project: ProjectCardProps,
};

export const ProjectModal: React.FC<Props> = ({ project }) => {
  const {
    title,
    owner,
    status,
    members,
    maxMembers,
    description,
    creationDate,
    // isFavorite,
    comunication,
  } = project;

  const { setIsModal } = useContext(ModalContext);

  return (
    <div className="projectModal">
      <div className="projectModal__top">
        <div className="projectModal__wrapper">
          <h1>{title}</h1>
          <ProjectCardStatus status={status} />
        </div>

        <IconButton svg={cross} onClick={() => setIsModal(false)} />
      </div>

      <ProjectCardOwner owner={owner} />
      <ProjectCardMembers members={members.length} maxMembers={maxMembers} />

      <ul className="projectModal__list">
        {members.map((member) => (
          <ProjectCardMemberItem
            key={member.id}
            member={member.id}
          />
        ))}
      </ul>

      <p className="projectModal__container">
        <h2>Description</h2>
        <ProjectCardDescriptions description={description} isModal={!!true} />
      </p>

      <p className="projectModal__container">
        <h2>Comunication</h2>
        <ProjectCardComunaction comunication={comunication} />
      </p>

      <div className="projectModal__bottom">
        <div>
          <ProjectCardButton title="Apply" />
          <IconButton svg={favorite} />
        </div>

        <ProjectCardDate date={creationDate} />
      </div>
    </div>
  );
};
