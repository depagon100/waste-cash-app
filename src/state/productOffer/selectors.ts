import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const rootSelector = createSelector(
  (state: RootState): State.ProductOffer => state.productOffer,
  (productOffer: State.ProductOffer) => productOffer,
);

export const productOfferSuccessSelector = createSelector(
  rootSelector,
  (productOffer: State.ProductOffer): string => productOffer.success,
);

export const productOfferErrorSelector = createSelector(
  rootSelector,
  (productOffer: State.ProductOffer): string => productOffer.error,
);

export const isLoadingSelector = createSelector(
  rootSelector,
  (productOffer: State.ProductOffer): boolean => productOffer.isLoading,
);
