import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Notification } from '@/services/index';

import { setAppError } from '../app/actions';
import { RootState } from '../store';
import { tokenSelector } from '../user/selectors';
import { NotificationActions } from './constants';

export const setNotificationError = createAction<string | null>(
  NotificationActions.SET_NOTIFICATION_ERROR,
);

export const getNotifications = createAsyncThunk(
  NotificationActions.GET_NOTIFICATION_LIST,
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);

      const getNotificationsRes = await Notification.getNotifications({
        token,
      });
      const notifications: Objects.Notification[] = getNotificationsRes.data;

      return Promise.resolve({ list: notifications });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response) {
          const axiosError = error?.response as Objects.ServiceError;
          if (axiosError?.status && axiosError.status === 400) {
            return thunkAPI.rejectWithValue(axiosError.data.message);
          }
        }
      }

      // set global error
      thunkAPI.dispatch(setAppError('Server is busy. Please try again later.'));

      return Promise.reject();
    }
  },
);

export const seenNotification = createAsyncThunk(
  NotificationActions.SEEN_NOTIFICATION,
  async (params: { notificationId: number }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);

      await Notification.updateNotification({
        isSeen: true,
        notificationId: params.notificationId,
        token,
      });

      return Promise.resolve({ id: params.notificationId });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response) {
          const axiosError = error?.response as Objects.ServiceError;
          if (axiosError?.status && axiosError.status === 400) {
            return thunkAPI.rejectWithValue(axiosError.data.message);
          }
        }
      }

      // set global error
      thunkAPI.dispatch(setAppError('Server is busy. Please try again later.'));

      return Promise.reject();
    }
  },
);
