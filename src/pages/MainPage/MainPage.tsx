import {
  FC,
  useCallback,
  useState,
  useContext,
} from 'react';
import classNames from 'classnames';
import styles from './MainPage.module.scss';
import { SideBar } from '../../components/SideBar/SideBar';
import { GridHeader } from '../../components/GridHeader/GridHeader';
import { ProjectCard } from '../../components/projectCard/ProjectCard';
import { ModalContext } from '../../Providers/ModalProvider';
import { ProjectModal } from '../../Modals/ProjectModal/ProjectModal';
import { Modal } from '../../components/Modal/Modal';

export const MainPage: FC = () => {
  const [currentId, setCurrentId] = useState(0);
  const [positions, setPositions] = useState<string[]>([]);

  const { isModal, setIsModal } = useContext(ModalContext);

  const handleCardClick = useCallback((id: number) => {
    setIsModal(true);
    setCurrentId(id);
  }, []);

  const preMadeCards = [
    {
      id: 1,
      title: 'Taskify',
      status: 'In progress',
      owner: 'Vatalik',
      members: [
        { id: 1, name: 'Denys Bokov' },
        { id: 2, name: 'Kolya' },
        { id: 3, name: 'Denys Bokov' },
        { id: 4, name: 'Kolya' },
      ],
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
      comunication: { name: 'Slack', img: 'slack', link: 'https://slack.com/' },
    },
    {
      id: 2,
      title: 'Taskify',
      status: 'In progress',
      owner: 'Biden Prime',
      members: [
        { id: 1, name: 'Denys Bokov' },
        { id: 2, name: 'Kolya' },
        { id: 3, name: 'Denys Bokov' },
      ],
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
      comunication: { name: 'Telegram', img: 'telegram', link: 'https://web.telegram.org/a/' },

    },
    {
      id: 3,
      title: 'Taskify',
      status: 'In progress',
      owner: 'Geralt',
      members: [
        { id: 1, name: 'Denys Bokov' },
        { id: 2, name: 'Kolya' },
        { id: 3, name: 'Denys Bokov' },
        { id: 4, name: 'Kolya' },
        { id: 5, name: 'Denys Bokov' },

      ],
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
      comunication: { name: 'Discrod', img: 'discord', link: 'https://discord.com/' },

    },
    {
      id: 4,
      title: 'Taskify',
      status: 'In progress',
      owner: 'Mario',
      members: [
        { id: 1, name: 'Denys Bokov' },
        { id: 2, name: 'Kolya' },
        { id: 3, name: 'Kolya' },

      ],
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
      comunication: { name: 'Discrod', img: 'discord', link: 'https://discord.com/' },

    },
    {
      id: 5,
      title: 'Taskify',
      status: 'Finished',
      owner: 'Vigil',
      members: [
        { id: 1, name: 'Denys Bokov' },
        { id: 2, name: 'Kolya' },
      ],
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
      comunication: { name: 'Telegram', img: 'telegram', link: 'https://web.telegram.org/a/' },

    },
    {
      id: 6,
      title: 'Taskify',
      status: 'Recruitment',
      owner: 'Dante',
      members: [
        { id: 1, name: 'Denys Bokov' },
        { id: 2, name: 'Kolya' },
      ],
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
      comunication: { name: 'Telegram', img: 'telegram', link: 'https://web.telegram.org/a/' },

    },
    {
      id: 7,
      title: 'Taskify',
      status: 'In progress',
      owner: 'Trump Prime',
      members: [
        { id: 1, name: 'Denys Bokov' },
        { id: 2, name: 'Kolya' },
      ],
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
      comunication: { name: 'Slack', img: 'slack', link: 'https://slack.com/' },

    },
    {
      id: 8,
      title: 'Taskify',
      status: 'Finished',
      owner: 'Druttut',
      members: [
        { id: 1, name: 'Denys Bokov' },
        { id: 2, name: 'Kolya' },
      ],
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
      comunication: { name: 'Slack', img: 'slack', link: 'https://slack.com/' },

    },
    {
      id: 9,
      title: 'Taskify',
      status: 'Finished',
      owner: 'Druttut',
      members: [
        { id: 1, name: 'Denys Bokov' },
        { id: 2, name: 'Kolya' },
      ],
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
      comunication: { name: 'Slack', img: 'slack', link: 'https://slack.com/' },

    },
    {
      id: 10,
      title: 'Taskify',
      status: 'Finished',
      owner: 'Druttut',
      members: [
        { id: 1, name: 'Denys Bokov' },
        { id: 2, name: 'Kolya' },
      ],
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
      comunication: { name: 'Slack', img: 'slack', link: 'https://slack.com/' },

    },
    {
      id: 11,
      title: 'Taskify',
      status: 'Finished',
      owner: 'Druttut',
      members: [
        { id: 1, name: 'Denys Bokov' },
        { id: 2, name: 'Kolya' },
      ],
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
      comunication: { name: 'Slack', img: 'slack', link: 'https://slack.com/' },

    },
    {
      id: 12,
      title: 'Taskify',
      status: 'Finished',
      owner: 'Druttut',
      members: [
        { id: 1, name: 'Denys Bokov' },
        { id: 2, name: 'Kolya' },
      ],
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
      comunication: { name: 'Slack', img: 'slack', link: 'https://slack.com/' },

    },
    {
      id: 13,
      title: 'Taskify',
      status: 'Finished',
      owner: 'Druttut',
      members: [
        { id: 1, name: 'Denys Bokov' },
        { id: 2, name: 'Kolya' },
      ],
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
      comunication: { name: 'Slack', img: 'slack', link: 'https://slack.com/' },

    },
    {
      id: 14,
      title: 'Taskify',
      status: 'Finished',
      owner: 'Druttut',
      members: [
        { id: 1, name: 'Denys Bokov' },
        { id: 2, name: 'Kolya' },
      ],
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
      comunication: { name: 'Slack', img: 'slack', link: 'https://slack.com/' },

    },
    {
      id: 15,
      title: 'Taskify',
      status: 'Finished',
      owner: 'Druttut',
      members: [
        { id: 1, name: 'Denys Bokov' },
        { id: 2, name: 'Kolya' },
      ],
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
      comunication: { name: 'Slack', img: 'slack', link: 'https://slack.com/' },

    },
    {
      id: 16,
      title: 'Taskify',
      status: 'Finished',
      owner: 'Druttut',
      members: [
        { id: 1, name: 'Denys Bokov' },
        { id: 2, name: 'Kolya' },
      ],
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
      comunication: { name: 'Slack', img: 'slack', link: 'https://slack.com/' },

    },
    {
      id: 17,
      title: 'Taskify',
      status: 'Finished',
      owner: 'Druttut',
      members: [
        { id: 1, name: 'Denys Bokov' },
        { id: 2, name: 'Kolya' },
      ],
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
      comunication: { name: 'Slack', img: 'slack', link: 'https://slack.com/' },

    },
  ];

  const currentProject = preMadeCards
    .find((project) => project.id === currentId) || preMadeCards[1];

  return (
    <div className={classNames(styles.main, { [styles.main__block]: isModal })}>
      {isModal && (
        <Modal>
          <ProjectModal project={currentProject} />
        </Modal>
      )}

      <SideBar positions={positions} setPositions={setPositions} />
      <div className={styles.grid__container}>
        <GridHeader n={24} positions={positions} />
        <div className="grid">
          {preMadeCards.map((el) => (
            <ProjectCard
              key={el.id}
              id={el.id}
              title={el.title}
              status={el.status}
              owner={el.owner}
              members={el.members}
              maxMembers={el.maxMembers}
              isFavorite={el.isFavorite}
              creationDate={el.creationDate}
              description={el.description}
              comunication={el.comunication}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
