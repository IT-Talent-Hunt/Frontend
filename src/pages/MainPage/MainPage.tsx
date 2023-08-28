/* eslint-disable import/no-duplicates, no-shadow */
/* eslint-disable */

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
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import { SuccessApplyModal } from '../../Modals/SuccessApplyModal/SuccessApplyModal';
import { CenceledApplyModal } from '../../Modals/CanceledApplyModal/CanceledApplyModal';
import { useLocalStorage } from 'usehooks-ts';
import { User } from '../../Types/User';
import { useSearchParams } from 'react-router-dom';
import { SearchInput } from '../../components/SearchInput/SearchInput';

type Props = {
  isSideBar: boolean,
  setEditProject: (evennt: React.MouseEvent, projectId: number | undefined) => void,
  onCanceledFavorite: (value: string) => void,
  isApplyCanceled: boolean,
  cenceledMessage: string,
  isFavoriteCanceled: boolean,
  applyProject: (event: React.MouseEvent<HTMLButtonElement>, project: ProjectCardProps) => void,
  successMessage: string,
  setSuccessMessage: (value: string) => void,
  setCenceledMessage: (value: string) => void,
  cardClick: (project: ProjectCardProps) => void,
  currentProject: ProjectCardProps | null,
  onProjectModalClose: () => void,
};

export const MainPage: FC<Props> = ({
  isSideBar,
  setEditProject,
  onCanceledFavorite,
  applyProject,
  isApplyCanceled,
  cenceledMessage,
  isFavoriteCanceled,
  successMessage,
  setSuccessMessage,
  setCenceledMessage,
  cardClick,
  currentProject,
  onProjectModalClose,
}) => {
  const [currentUser] = useLocalStorage<User | null>('user', null);

  const [position, setPosition] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [filter, setFilter] = useState(FiltersEnumTypes.ALL);
  const [teamSize, setTeamSize] = useState('');

  const { isModal, setIsModal } = useContext(ModalContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('queryParam');

  const dispatch = useAppDispatch();
  const { projects, loading, error } = useAppSelector(state => state.projects);
  const { favorites, favoritesLoading, favoritesError } = useAppSelector(state => state.favorites);

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

    if (filter === FiltersEnumTypes.NEW) {
      link += `${(position || teamSize || status) ? '&' : '?'}sortBy=creationDate:ASC`;
    }

    if (query) {
      link += `${(position || teamSize || status) ? '&' : '?'}name=${query}`;
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

    console.log('123');
    dispatch(projectsActions.init(url));
  };

  const getSortedProjects = () => {
    const url = generateSpecialitiesLink(position, teamSize, status);
    dispatch(projectsActions.init(url));
  }

  const getFavoritesPojects = () => {
    console.log('fav');
    dispatch(favoritesActions.init());
  };

  useEffect(() => {
    getProjects();
  }, [filter === FiltersEnumTypes.ALL, position, status, teamSize, query]);

  useEffect(() => {
    if (currentUser?.id) {
      getFavoritesPojects();
    }
  }, [filter === FiltersEnumTypes.FAVORITES]);

  useEffect(() => {
    getSortedProjects();

  }, [filter === FiltersEnumTypes.NEW])

  // const currentProject = projects
  //   .find((project) => project.id === currentId) || projects[1];

  console.log(projects);

  return (
    <div className={classNames(styles.main, { [styles.main__block]: isModal })}>
      {isModal && currentProject && (
        <Modal>
          <ProjectModal
            project={currentProject}
            onApply={applyProject}
            onFavorite={onCanceledFavorite}
            onProjectModalClose={onProjectModalClose}
          />
        </Modal>
      )}

      {isModal && !isApplyCanceled && successMessage &&   (
        <Modal>
          <SuccessApplyModal message={successMessage} onClose={setSuccessMessage}/>
        </Modal>
      )}

      {isModal && isApplyCanceled && cenceledMessage && (
        <Modal>
          <CenceledApplyModal message={cenceledMessage} onClose={setCenceledMessage} />
        </Modal>
      )}

      {isModal && isFavoriteCanceled && cenceledMessage && (
        <Modal>
          <CenceledApplyModal message={cenceledMessage} onClose={setCenceledMessage} />
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
        <div className={styles.wrapper}>
          <GridHeader
            n={filter === FiltersEnumTypes.ALL
              || filter === FiltersEnumTypes.NEW
                ? projects.length
                : favorites.length
            }
            position={position}
            filter={filter}
            setFilter={setFilter}
          />

          {window.innerWidth < 640 && (
            <SearchInput />
          )}
        </div>

        {filter === 'all' && (
          <ProjectsField
            projects={projects}
            error={error}
            loader={loading}
            onCardClick={cardClick}
            setEditProject={setEditProject}
            onApply={applyProject}
            onFavorite={onCanceledFavorite}
          />
        )}

        {filter === 'new' && (
          <ProjectsField
            projects={projects}
            error={error}
            loader={loading}
            onCardClick={cardClick}
            setEditProject={setEditProject}
            onApply={applyProject}
            onFavorite={onCanceledFavorite}
          />
        )}

        {filter === 'favorites' && (
          <ProjectsField
            projects={favorites}
            error={favoritesError}
            loader={favoritesLoading}
            onCardClick={cardClick}
            setEditProject={setEditProject}
            onApply={applyProject}
            onFavorite={onCanceledFavorite}
          />
        )}
      </div>
    </div>
  );
};
