import { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import * as favoritesActions from '../../../redux/features/favorites/favorites';
import { IconButton } from '../../IconButton/IconButton';
import { ProjectCardProps } from '../../../Types/ProjectCardProps';
import heartEmpty from '../../../svg/heartEmpty.svg';
import heartFull from '../../../svg/heartFull.svg';
import { User } from '../../../Types/User';

type Props = {
  project: ProjectCardProps,
  onFavorite: (value: string) => void,
};

export const ProjectCardFavorite: React.FC<Props> = ({ project, onFavorite }) => {
  const { id } = project;

  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector(state => state.favorites);
  const [user] = useLocalStorage<User | null>('user', null);

  const isFavorite = favorites.some((fav) => fav.id === id);

  const handleFavoritesAdd = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (user && user?.id) {
      dispatch(favoritesActions.push(id));
      dispatch(favoritesActions.add(project));
    } else {
      onFavorite(project.name);
    }
  }, []);

  const handleFavoritesRemove = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    dispatch(favoritesActions.remove(project.id));
    dispatch(favoritesActions.take(project));
  }, []);

  return (
    <div>
      {isFavorite ? (
        <IconButton svg={heartFull} onClick={handleFavoritesRemove} />
      ) : (
        <IconButton svg={heartEmpty} onClick={handleFavoritesAdd} />
      )}
    </div>
  );
};
