import { createSelector } from '@reduxjs/toolkit';

import { ProductOfferStatus } from '@/constants/index';

import { RootState } from '../store';
import { userDataSelector } from '../user/selectors';

const rootSelector = createSelector(
  (state: RootState): State.Product => state.product,
  (product: State.Product) => product,
);

export const productDataSelector = createSelector(
  rootSelector,
  (product: State.Product): Objects.Product => product.data!,
);

export const productListSelector = createSelector(
  rootSelector,
  (product: State.Product): Objects.Product[] => product.list,
);

export const productOfferListSelector = createSelector(
  [rootSelector, productDataSelector],
  (product: State.Product): Objects.ProductOffer[] => product.data?.offers!,
);

export const productPendingOfferListSelector = createSelector(
  productOfferListSelector,
  (productOfferList: Objects.ProductOffer[]): Objects.ProductOffer[] =>
    productOfferList?.filter(
      (offer) => offer.status === ProductOfferStatus.PENDING,
    ) || [],
);

export const productOfferDataSelector = createSelector(
  [productOfferListSelector, userDataSelector],
  (
    productOffers: Objects.ProductOffer[],
    userData: Objects.User,
  ): Objects.ProductOffer | undefined =>
    productOffers?.find(
      (productOffer) =>
        productOffer.user.id === userData.id &&
        productOffer.status === ProductOfferStatus.PENDING,
    ),
);

export const productErrorSelector = createSelector(
  rootSelector,
  (product: State.Product): string => product.error,
);

export const productSuccessSelector = createSelector(
  rootSelector,
  (product: State.Product): string => product.success,
);

export const isLoadingSelector = createSelector(
  rootSelector,
  (product: State.Product): boolean => product.isLoading,
);
