import { client } from './fetchProd';

export const getData = (url: string) => {
  return client.get(url);
};
