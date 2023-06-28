import { FC, useCallback, useState } from 'react';
import styles from './MainPage.module.scss';
import { SideBar } from '../../components/SideBar/SideBar';
import { GridHeader } from '../../components/GridHeader/GridHeader';
import { ProjectCard } from '../../components/projectCard/ProjectCard';
import { ProjectModal } from '../../components/ProjectModal/ProjectModal';

export const MainPage: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const handleCardClick = useCallback((id: number) => {
    setShowModal(true);
    setCurrentId(id);
  }, []);

  const preMadeCards = [
    {
      id: 1,
      title: 'Taskify',
      status: 'In progress',
      owner: 'Vatalik',
      members: 4,
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
    },
    {
      id: 2,
      title: 'Taskify',
      status: 'In progress',
      owner: 'Biden Prime',
      members: 4,
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
    },
    {
      id: 3,
      title: 'Taskify',
      status: 'In progress',
      owner: 'Geralt',
      members: 4,
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
    },
    {
      id: 4,
      title: 'Taskify',
      status: 'In progress',
      owner: 'Mario',
      members: 4,
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
    },
    {
      id: 5,
      title: 'Taskify',
      status: 'finished',
      owner: 'Vigil',
      members: 4,
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
    },
    {
      id: 6,
      title: 'Taskify',
      status: 'recruitment',
      owner: 'Dante',
      members: 4,
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
    },
    {
      id: 7,
      title: 'Taskify',
      status: 'In progress',
      owner: 'Trump Prime',
      members: 4,
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
    },
    {
      id: 8,
      title: 'Taskify',
      status: 'jOver',
      owner: 'Druttut',
      members: 4,
      maxMembers: 5,
      isFavorite: true,
      creationDate: '26.06.2023',
      description:
        '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.',
    },
  ];

  return (
    <div className={styles.main}>
      {showModal && (
        <ProjectModal
          title={preMadeCards[currentId - 1].title}
          status={preMadeCards[currentId - 1].status}
          owner={preMadeCards[currentId - 1].owner}
          members={preMadeCards[currentId - 1].members}
          maxMembers={preMadeCards[currentId - 1].maxMembers}
          isFavorite={preMadeCards[currentId - 1].isFavorite}
          creationDate={preMadeCards[currentId - 1].creationDate}
          description={preMadeCards[currentId - 1].description}
          onClick={setShowModal}
        />
      )}
      <SideBar />
      <div className={styles.grid__container}>
        <GridHeader n={24} position="" />
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
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
