import { getData, postData } from '../../../../helpers/helpers';

export const getExportRequests = (userId: number) => {
  return getData(`requests/by-user/${userId}`);
};

export const sendRequest = (body: any) => {
  return postData('requests', body);
};
