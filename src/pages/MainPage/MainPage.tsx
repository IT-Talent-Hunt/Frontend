import { FC } from 'react';
import styles from './MainPage.module.scss';
import { SideBar } from '../../components/SideBar/SideBar';
import { GridHeader } from '../../components/GridHeader/GridHeader';
import { ProjectCard } from '../../components/projectCard/ProjectCard';

export const MainPage: FC = () => {
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
      <SideBar />
      <div className={styles.grid__container}>
        <GridHeader n={24} position="" />
        <div className="grid">
          {preMadeCards.map((el) => (
            <ProjectCard
              key={el.id}
              title={el.title}
              status={el.status}
              owner={el.owner}
              members={el.members}
              maxMembers={el.maxMembers}
              isFavorite={el.isFavorite}
              creationDate={el.creationDate}
              description={el.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
