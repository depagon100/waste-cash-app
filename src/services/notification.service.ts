import axios, { AxiosResponse } from 'axios';

import { host } from '../config';

const url = `${host}/notifications`;

export const getNotifications = async (params: { token: string }) =>
  (await axios({
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
    method: 'GET',
    url,
  })) as unknown as AxiosResponse<Objects.Notification[]>;

export const updateNotification = async (params: {
  isSeen: boolean;
  notificationId: number;
  token: string;
}) =>
  (await axios({
    data: {
      isSeen: params.isSeen,
    },
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
    method: 'PATCH',
    url: `${url}/${params.notificationId}`,
  })) as unknown as AxiosResponse<Objects.Notification>;
