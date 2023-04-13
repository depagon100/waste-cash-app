import axios, { AxiosResponse } from 'axios';

import { host } from '../config';

const url = `${host}/auth`;

export const login = async (params: { username: string; password: string }) => {
  return (await axios({
    data: params,
    method: 'POST',
    url: `${url}/login`,
  })) as unknown as AxiosResponse<Objects.Login>;
};

export const register = async (params: Omit<Objects.User, 'id'>) => {
  return (await axios({
    data: params,
    method: 'POST',
    url: `${url}/register`,
  })) as unknown as AxiosResponse<Objects.Register>;
};
