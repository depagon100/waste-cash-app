import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const rootSelector = createSelector(
  (state: RootState): State.App => state.app,
  (app: State.App) => app,
);

export const appErrorSelector = createSelector(
  rootSelector,
  (app: State.App): string => app.error,
);

export const isInitializeSelector = createSelector(
  rootSelector,
  (app: State.App): boolean => app.isInitialize,
);

export const roleSelector = createSelector(
  rootSelector,
  (app: State.App): string => app.role!,
);
