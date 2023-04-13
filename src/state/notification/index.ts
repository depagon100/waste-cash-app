import { createSlice } from '@reduxjs/toolkit';

import { getNotifications, seenNotification } from './actions';

const initialState: State.Notification = {
  error: '',
  isLoading: false,
  list: [],
};

export const notificationSlice = createSlice({
  extraReducers: {
    // Get Notification List
    [`${getNotifications.pending}`]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [`${getNotifications.fulfilled}`]: (
      state,
      action: {
        payload: { list: Objects.Notification[] };
      },
    ) => ({
      ...state,
      isLoading: false,
      list: action.payload.list,
    }),
    [`${getNotifications.rejected}`]: (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }),

    // Seen Notification
    [`${seenNotification.pending}`]: (state) => ({
      ...state,
    }),
    [`${seenNotification.fulfilled}`]: (state, action) => ({
      ...state,
      list: [
        ...state.list.map((notification) => {
          if (notification.id === action.payload.id) {
            return {
              ...notification,
              isSeen: true,
            };
          }
          return notification;
        }),
      ],
    }),
    [`${seenNotification.rejected}`]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
  initialState,
  name: 'notification',
  reducers: {},
});
