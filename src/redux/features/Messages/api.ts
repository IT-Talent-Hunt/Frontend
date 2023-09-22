import { getData, patchData } from '../../../helpers/helpers';

export const getMessages = (userId: number) => {
  return getData(`notifications/${userId}`);
};

export const markAsRead = (messageId: number) => {
  return patchData(`notifications/${messageId}/mark-as-read`, null);
};
