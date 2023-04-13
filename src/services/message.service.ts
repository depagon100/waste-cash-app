import axios, { AxiosResponse } from 'axios';

import { host } from '../config';

const url = `${host}/messages`;

export const createMessage = async (params: {
  token: string;
  conversationId?: number;
  recipient?: number;
  content: string;
}) => {
  const { token, ...rest } = params;

  return (await axios({
    data: rest,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    url,
  })) as unknown as AxiosResponse<Objects.Message>;
};
