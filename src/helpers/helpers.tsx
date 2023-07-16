import { client } from './fetchProd';

export const getData = (url: string) => {
  return client.get(url);
};

export const postData = (url: string, data: any) => {
  return client.post(url, data);
};

export const patchData = (url: string, data: any) => {
  return client.patch(url, data);
};
