import axios, { AxiosResponse } from 'axios';

import { host } from '../config';

const url = `${host}/shops`;

export const getShops = async () =>
  (await axios({
    method: 'GET',
    url,
  })) as unknown as AxiosResponse<Objects.User[]>;
