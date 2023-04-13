import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const rootSelector = createSelector(
  (state: RootState): State.User => state.user,
  (user: State.User) => user,
);

export const userDataSelector = createSelector(
  rootSelector,
  (user: State.User): Objects.User => user.data!,
);

export const userErrorSelector = createSelector(
  rootSelector,
  (user: State.User): string => user.error,
);

export const tokenSelector = createSelector(
  rootSelector,
  (user: State.User): string => user.token,
);

export const isAuthSelector = createSelector(
  rootSelector,
  userDataSelector,
  (user: State.User, userData: Objects.User): boolean =>
    Boolean(user.token) && Boolean(userData.id),
);

export const isLoadingSelector = createSelector(
  rootSelector,
  (user: State.User): boolean => user.isLoading,
);
