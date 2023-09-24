import {
  FC,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { useLocalStorage } from 'usehooks-ts';
import { useSearchParams } from 'react-router-dom';
import styles from './MainPage.module.scss';
import { SideBar } from '../../components/SideBar/SideBar';
import { GridHeader } from '../../components/GridHeader/GridHeader';
import { ModalContext } from '../../Providers/ModalProvider';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import * as projectsActions from '../../redux/features/projects/projects';
import * as favoritesActions from '../../redux/features/favorites/favorites';
import { ProjectsField } from '../../components/ProjectsField/ProjectsFiled';
import { FiltersEnumTypes } from '../../Types/FilterEnumTypes';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import { User } from '../../Types/User';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import { generateSpecialitiesLink } from '../../helpers/helpers';
import { updateSeachParams } from '../../helpers/updateSearchParams';

type Props = {
  isSideBar: boolean,
  setEditProject: (evennt: React.MouseEvent, projectId: number) => void,
  onCanceledFavorite: (value: string) => void,
  applyProject: (event: React.MouseEvent<HTMLButtonElement>, project: ProjectCardProps) => void,
  cardClick: (project: ProjectCardProps) => void,
  removeHandler: (event: React.MouseEvent<HTMLButtonElement>, project: ProjectCardProps) => void,
  filter: FiltersEnumTypes,
  setFilter: (value: FiltersEnumTypes) => void,
};

export const MainPage: FC<Props> = ({
  isSideBar,
  setEditProject,
  onCanceledFavorite,
  applyProject,
  cardClick,
  removeHandler,
  filter,
  setFilter,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('queryParam') || '';
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '4';

  const [currentUser] = useLocalStorage<User | null>('user', null);

  const [position, setPosition] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [teamSize, setTeamSize] = useState<string>('');

  const onFilter = useCallback((value: FiltersEnumTypes) => {
    setSearchParams(updateSeachParams(searchParams, { page: '1' }));
    setFilter(value);
  }, []);

  const { isModal } = useContext(ModalContext);

  const dispatch = useAppDispatch();

  const {
    projects,
    loading,
    error,
    pages,
    length,
  } = useAppSelector(state => state.projects);

  const {
    favorites,
    favoritesLoading,
    favoritesError,
    favoritesPages,
    favoritesLength,
  } = useAppSelector(state => state.favorites);

  const getProjects = () => {
    const url = generateSpecialitiesLink(
      'projects/search', position, teamSize,
      status, filter, query, perPage, page,
    );

    dispatch(projectsActions.init(url));
  };

  const getSortedProjects = () => {
    const url = generateSpecialitiesLink(
      'projects/search', position, teamSize,
      status, filter, query, perPage, page,
    );

    dispatch(projectsActions.init(url));
  };

  const getFavoritesPojects = () => {
    if (filter === FiltersEnumTypes.FAVORITES) {
      const url = generateSpecialitiesLink(
        'liked-carts/by-user/projects', position,
        teamSize, status, filter, query, perPage, page,
      );

      dispatch(favoritesActions.init(url));
    }
  };

  useEffect(() => {
    getProjects();
  }, [filter === FiltersEnumTypes.ALL, position, status, teamSize, query, perPage, page]);

  useEffect(() => {
    if (currentUser?.id) {
      getFavoritesPojects();
    }
  }, [filter === FiltersEnumTypes.FAVORITES, page, perPage]);

  useEffect(() => {
    getSortedProjects();
  }, [filter === FiltersEnumTypes.NEW]);

  useEffect(() => {
    return () => {
      dispatch(projectsActions.clear());
      dispatch(favoritesActions.clear());
    };
  }, []);

  return (
    <div className={classNames(styles.main, { [styles.main__block]: isModal })}>
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
            n={
              filter === FiltersEnumTypes.ALL
                || filter === FiltersEnumTypes.NEW
                ? length
                : favoritesLength
            }
            position={position}
            filter={filter}
            setFilter={onFilter}
          />

          {window.innerWidth < 640 && filter !== FiltersEnumTypes.FAVORITES && (
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
            pages={pages}
            removeHandler={removeHandler}
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
            pages={pages}
            removeHandler={removeHandler}
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
            pages={favoritesPages}
            removeHandler={removeHandler}
          />
        )}
      </div>
    </div>
  );
};
