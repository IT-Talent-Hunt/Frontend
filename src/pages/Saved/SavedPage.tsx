/* eslint-disable */

import { useContext, useEffect } from 'react';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import { ProjectsField } from '../../components/ProjectsField/ProjectsFiled';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import * as favoritesActions from '../../redux/features/favorites/favorites';
import './SavedPage.scss';
import { ModalContext } from '../../Providers/ModalProvider';

type Props = {
  onCardClick: (project: ProjectCardProps) => void,
  setEditProject: (event: React.MouseEvent, projectId: number | undefined) => void,
  onApply: (event: React.MouseEvent<HTMLButtonElement>, project: ProjectCardProps) => void,
  onFavorite: (value: string) => void,
  applyProject: (event: React.MouseEvent<HTMLButtonElement>, project: ProjectCardProps) => void,
};

export const SavedPage: React.FC<Props> = ({
  onCardClick,
  setEditProject,
  onApply,
  onFavorite,
}) => {
  const { isModal, setIsModal } = useContext(ModalContext);
  const dispatch = useAppDispatch();

  const {
    favorites,
    favoritesError,
    favoritesLoading,
    favoritesPages,
  } = useAppSelector(state => state.favorites);

  useEffect(() => {
    dispatch(favoritesActions.init('liked-carts/by-user/projects/'));

      return () => {
        dispatch(favoritesActions.clear());
      }
  }, []);

  return (
    <section className="saved">
      <h1 className="saved__title">Saved</h1>

      <ProjectsField
        projects={favorites}
        error={favoritesError}
        loader={favoritesLoading}
        onCardClick={onCardClick}
        setEditProject={setEditProject}
        onApply={onApply}
        onFavorite={onFavorite}
        pages={favoritesPages}
      />
    </section>
  );
};
