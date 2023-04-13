import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const rootSelector = createSelector(
  (state: RootState): State.Notification => state.notification,
  (notification: State.Notification) => notification,
);

export const notificationListSelector = createSelector(
  rootSelector,
  (notification: State.Notification): Objects.Notification[] =>
    notification.list,
);

export const notificationErrorSelector = createSelector(
  rootSelector,
  (notification: State.Notification): string => notification.error,
);

export const isLoadingSelector = createSelector(
  rootSelector,
  (notification: State.Notification): boolean => notification.isLoading,
);

export const hasUnseenNotificationSelector = createSelector(
  notificationListSelector,
  (notificationList: Objects.Notification[]): boolean =>
    notificationList.some((notification) => !notification.isSeen),
);
