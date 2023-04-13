import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const rootSelector = createSelector(
  (state: RootState): State.Shop => state.shop,
  (shop: State.Shop) => shop,
);

export const shopDataSelector = createSelector(
  rootSelector,
  (shop: State.Shop): Objects.User => shop.data!,
);

export const shopListSelector = createSelector(
  rootSelector,
  (shop: State.Shop): Objects.User[] => shop.list,
);

export const shopErrorSelector = createSelector(
  rootSelector,
  (shop: State.Shop): string => shop.error,
);

export const isLoadingSelector = createSelector(
  rootSelector,
  (shop: State.Shop): boolean => shop.isLoading,
);
