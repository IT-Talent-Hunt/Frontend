import { deleteData, getData, putData } from '../../../helpers/helpers';

export const getFavorites = () => {
  return getData('liked-carts/by-user');
};

export const addFavorite = (projectId: number) => {
  return putData(`liked-carts/projects/${projectId}`, null);
};

export const removeFavorite = (projectId: number) => {
  return deleteData(`liked-carts/projects/${projectId}`);
};
