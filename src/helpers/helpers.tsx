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

export const putData = (url: string, data: any) => {
  return client.put(url, data);
};

export const deleteData = (url: string) => {
  return client.delete(url);
};

export function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
