/* eslint-disable import/no-duplicates, no-shadow */

import {
  FC,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import classNames from 'classnames';
import styles from './MainPage.module.scss';
import { SideBar } from '../../components/SideBar/SideBar';
import { GridHeader } from '../../components/GridHeader/GridHeader';
// import { ProjectCard } from '../../components/projectCard/ProjectCard';
import { ModalContext } from '../../Providers/ModalProvider';
import { ProjectModal } from '../../Modals/ProjectModal/ProjectModal';
import { Modal } from '../../components/Modal/Modal';
// import { getData } from '../../helpers/helpers';
// import { ProjectCardProps } from '../../Types/ProjectCardProps';
// import { Empty } from '../../components/Empty/Empty';
// import { Error } from '../../components/Error/Error';
// import { LoaderBig } from '../../components/Loader/LoaderBig';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { init } from '../../redux/features/projects/projects';
import * as projectsActions from '../../redux/features/projects/projects';
import * as favoritesActions from '../../redux/features/favorites/favorites';
// import { getData } from '../../helpers/helpers';
// import { ProjectCardProps } from '../../Types/ProjectCardProps';
// import { deleteData } from '../../helpers/helpers';
import { ProjectsField } from '../../components/ProjectsField/ProjectsFiled';
import { FiltersEnumTypes } from '../../Types/FilterEnumTypes';

type Props = {
  isSideBar: boolean,
  setEditProject: (evennt: React.MouseEvent, projectId: number) => void,
};

export const MainPage: FC<Props> = ({ isSideBar, setEditProject }) => {
  const [currentId, setCurrentId] = useState(0);

  const [position, setPosition] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [filter, setFilter] = useState(FiltersEnumTypes.ALL);
  const [teamSize, setTeamSize] = useState('');

  const { isModal, setIsModal } = useContext(ModalContext);

  const dispatch = useAppDispatch();
  const { projects, loading, error } = useAppSelector(state => state.projects);
  const { favorites, favoritesLoading, favoritesError } = useAppSelector(state => state.favorites);

  const handleCardClick = useCallback((id: number) => {
    setIsModal(true);
    setCurrentId(id);
  }, []);

  function generateSpecialitiesLink(position?: string, teamSize?: string, status?: string): string {
    let link = 'projects/search';

    const professionsMap: Record<string, string> = {
      'UI/UX Designer': 'UI_UX_DESIGNER',
      'Front-end developer': 'FRONTEND_DEVELOPER',
      'Back-end developer': 'BACKEND_DEVELOPER',
      'Full-stack developer': 'FULLSTACK_DEVELOPER',
      DevOps: 'DEVOPS',
      'Project Manager': 'PROJECT_MANAGER',
      QA: 'QA_ENGINEER',
      Mentor: 'MENTOR',
    };

    const statusesMap: Record<string, string> = {
      Recruitment: 'RECRUITMENT',
      'In progress': 'IN_PROGRESS',
      Finished: 'FINISHED',
    };

    if (position) {
      const professionCode = professionsMap[position];

      if (professionCode) {
        link += `?specialities=${professionCode}`;
      }
    }

    if (teamSize) {
      link += `${position ? '&' : '?'}teamSize=${teamSize}`;
    }

    if (status && status !== 'All') {
      const statusCode = statusesMap[status];

      link += `${(position || teamSize) ? '&' : '?'}status=${statusCode}`;
    }

    return link;
  }

  /* eslint-disable-next-line */
  console.log(generateSpecialitiesLink(position, teamSize, status));

  const getProjects = () => {
    // const professionsMap: Record<string, string> = {
    //   'UI/UX designer': 'UI_UX_DESIGNER',
    //   'Front-end developer': 'FRONTEND_DEVELOPER',
    //   'Back-end developer': 'BACKEND_DEVELOPER',
    //   DevOps: 'DEVOPS',
    //   'Project manager': 'PROJECT_MANAGER',
    //   'QA Engineer': 'QA_ENGINEER',
    //   Mentor: 'MENTOR',
    // };

    // const url = `projects/search${position
    //   ? `?specialities=${professionsMap[position]}`
    //   : ''} ${status ? `&status=${status.toUpperCase()}` : ''}`;

    const url = generateSpecialitiesLink(position, teamSize, status);

    dispatch(projectsActions.init(url));
  };

  const getFavoritesPojects = () => {
    dispatch(favoritesActions.init());
  };

  useEffect(() => {
    getProjects();
    getFavoritesPojects();
  }, [filter, position, status, teamSize]);

  const currentProject = projects
    .find((project) => project.id === currentId) || projects[1];

  return (
    <div className={classNames(styles.main, { [styles.main__block]: isModal })}>
      {isModal && (
        <Modal>
          <ProjectModal project={currentProject} />
        </Modal>
      )}

      <div
        className={classNames(
          styles.bar,
          { [styles.bar__move]: isSideBar },
        )}
      >
        <SideBar
          position={position}
          setPosition={setPosition}
          status={status}
          setStatus={setStatus}
          teamSize={teamSize}
          setTeamSize={setTeamSize}
        />
      </div>

      <div className={styles.grid__container}>
        <GridHeader
          n={0}
          position={position}
          filter={filter}
          setFilter={setFilter}
        />

        {filter === 'all' && (
          <ProjectsField
            projects={projects}
            error={error}
            loader={loading}
            onCardClick={handleCardClick}
            setEditProject={setEditProject}
          />
        )}

        {filter === 'favorites' && (
          <ProjectsField
            projects={favorites}
            error={favoritesError}
            loader={favoritesLoading}
            onCardClick={handleCardClick}
            setEditProject={setEditProject}
          />
        )}
      </div>
    </div>
  );
};
