import { FC } from 'react';
import styles from './MainPage.module.scss';
import { SideBar } from '../../components/SideBar/SideBar';
import { GridHeader } from '../../components/GridHeader/GridHeader';
import { ProjectCard } from '../../components/projectCard/ProjectCard';

export const MainPage: FC = () => {
  return (
    <div className={styles.main}>
      <SideBar />
      <div className={styles.grid__container}>
        <GridHeader n={24} position="" />
        <ProjectCard
          title="Taskify"
          status="In progress"
          owner="Joe Biden"
          members={4}
          maxMembers={5}
          description={
            '"Taskify" is a simple web application for task management with collaboration. The goal is to provide organization and productivity in the work environment.'
          }
          creationDate="16.06.2023"
          isFavorite
        />
      </div>
    </div>
  );
};
