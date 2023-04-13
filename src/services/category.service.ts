import axios, { AxiosResponse } from 'axios';

import { host } from '../config';

const url = `${host}/categories`;

export const getCategories = async () =>
  (await axios({
    method: 'GET',
    url,
  })) as unknown as AxiosResponse<Objects.Category[]>;
