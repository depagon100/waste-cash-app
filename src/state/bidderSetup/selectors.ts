import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const rootSelector = createSelector(
  (state: RootState): State.BidderSEtup => state.bidderSetup,
  (bidderSetup: State.BidderSEtup) => bidderSetup,
);

export const bidderSetupSuccessSelector = createSelector(
  rootSelector,
  (bidderSetup: State.BidderSEtup): string => bidderSetup.success,
);

export const bidderSetupErrorSelector = createSelector(
  rootSelector,
  (bidderSetup: State.BidderSEtup): string => bidderSetup.error,
);

export const isLoadingSelector = createSelector(
  rootSelector,
  (bidderSetup: State.BidderSEtup): boolean => bidderSetup.isLoading,
);
