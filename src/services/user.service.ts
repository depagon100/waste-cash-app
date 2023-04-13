import axios, { AxiosResponse } from 'axios';

import { host } from '../config';

const url = `${host}/users`;

export const me = async (params: { token: string }) => {
  return (await axios({
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
    method: 'GET',
    url: `${url}/me`,
  })) as unknown as AxiosResponse<Objects.Me>;
};

export const update = async (params: {
  token: string;
  data: Partial<Objects.User>;
}) => {
  return (await axios({
    data: params.data,
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
    method: 'PATCH',
    url: `${url}/me`,
  })) as unknown as AxiosResponse<Objects.Me>;
};
