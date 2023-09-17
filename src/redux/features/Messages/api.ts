import { getData } from '../../../helpers/helpers';

export const getMessages = (userId: number) => {
  return getData(`notifications/${userId}`);
};
