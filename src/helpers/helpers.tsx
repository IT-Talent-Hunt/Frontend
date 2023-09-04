import { FiltersEnumTypes } from '../Types/FilterEnumTypes';
import { professionsMap, statusesMap } from './Variables';
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

export function getContactLink(platform: string, url: string) {
  let link = '';

  switch (platform) {
    case 'Email':
      link = `mailto:${url}`;
      break;

    case 'Telegram':
      link = `https://t.me/${url}/`;
      break;

    default:
      link = url;
      break;
  }

  return link;
}

export function generateSpecialitiesLink(
  baseLink: string,
  position?: string,
  teamSize?: string,
  status?: string,
  filter?: string,
  query?: string,
  perPage?: string,
  page?: string,
): string {
  let link = baseLink;

  if (position) {
    const professionCode = professionsMap[position];

    if (professionCode) {
      link += `?specialities=${professionCode}`;
    }
  }

  if (teamSize) {
    link += `${position ? '&' : '?'}teamSize=${teamSize}`;
  }

  if (status) {
    const statusCode = statusesMap[status];

    link += `${(position || teamSize) ? '&' : '?'}status=${statusCode}`;
  }

  if (filter === FiltersEnumTypes.NEW) {
    link += `${(position || teamSize || status) ? '&' : '?'}sortBy=creationDate:DESC`;
  }

  if (query) {
    link += `${(position || teamSize || status || filter === FiltersEnumTypes.NEW) ? '&' : '?'}name=${query}`;
  }

  if (perPage) {
    link += `${(position || teamSize || status || query || filter === FiltersEnumTypes.NEW) ? '&' : '?'}count=${perPage}`;
  }

  if (page) {
    link += `${(position || teamSize || status || query || perPage) ? '&' : '?'}page=${+page - 1}`;
  }

  /* eslint-disable */
  console.log(link);
  return link;
}
