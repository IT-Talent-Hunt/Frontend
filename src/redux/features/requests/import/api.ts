import { getData, patchData } from '../../../../helpers/helpers';

export const getImportRequests = (userId: number) => {
  return getData(`requests/by-projects-owner/${userId}`);
};

export const requestStatusHandler = (requestId: number, status: string) => {
  return patchData(`requests/${requestId}/${status}`, null);
};
