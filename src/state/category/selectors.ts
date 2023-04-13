import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const rootSelector = createSelector(
  (state: RootState): State.Category => state.category,
  (category: State.Category) => category,
);

export const categoryListSelector = createSelector(
  rootSelector,
  (category: State.Category): Objects.Category[] => category.list,
);

export const categoryErrorSelector = createSelector(
  rootSelector,
  (category: State.Category): string => category.error,
);

export const isLoadingSelector = createSelector(
  rootSelector,
  (category: State.Category): boolean => category.isLoading,
);
