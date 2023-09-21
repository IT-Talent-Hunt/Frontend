/* eslint-disable */

export const BASE_URL = 'https://skill-swap-hub.onrender.com';
// export const BASE_URL =   'https://onero.serveo.net';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json',
    };
  }

  const token = localStorage.getItem('tokenId')?.slice(1, -1);

  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return fetch(`${BASE_URL}/${url}`, options)
    .then(response => {
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.setItem('tokenId', '""');
          localStorage.setItem('user', '{}');
          localStorage.setItem('isTokenValid', 'false');
        }

        throw new Error(`${response.status} - ${response.statusText}`);
      }

      /* eslint-disable-next-line */
      console.log(response.status, response);


      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  put: <T>(url: string, data: any) => request<T>(url, 'PUT', data),
  delete: (url: string) => request(url, 'DELETE'),
};
