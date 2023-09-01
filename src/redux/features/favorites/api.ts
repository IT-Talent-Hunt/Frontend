import { deleteData, getData, putData } from '../../../helpers/helpers';

export const getFavorites = (url: string) => {
  return getData(url);
};

export const addFavorite = (projectId: number) => {
  return putData(`liked-carts/projects/${projectId}`, null);
};

export const removeFavorite = (projectId: number) => {
  return deleteData(`liked-carts/projects/${projectId}`);
};
