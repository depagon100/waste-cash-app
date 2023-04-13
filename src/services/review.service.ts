import axios, { AxiosResponse } from 'axios';

import { host } from '../config';

const url = `${host}/reviews`;

export const getReviews = async (params: { token: string }) =>
  (await axios({
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
    method: 'GET',
    url,
  })) as unknown as AxiosResponse<Objects.Review[]>;
