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

export function formatVisibleDate(inputDate: string): string {
  const formatedDate = formatDate(inputDate);

  const parts = formatedDate.split('.');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  const inputDateObj = new Date(year, month, day);

  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - inputDateObj.getTime();

  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    return "Today";
  } else if (daysDifference === 1) {
    return "Yesterday";
  } else if (daysDifference <= 7) {
    return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
  } else if (daysDifference <= 14) {
    return "Last week";
  } else if (daysDifference <= 21) {
    return "Two weeks ago";
  } else if (daysDifference <= 28) {
    return "Three weeks ago";
  } else if (daysDifference <= 45) {
    return "Last month";
  } else {
    return inputDate;
  }
}
