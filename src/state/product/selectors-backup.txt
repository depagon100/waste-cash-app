import { createSelector } from '@reduxjs/toolkit';

import { IProductState, IProduct } from '../../types';
import { RootState } from '../store';

const rootSelector = createSelector(
  (state: RootState): IProductState => state.product,
  (product: IProductState) => product,
);

export const productDataSelector = createSelector(
  rootSelector,
  (product: IProductState): IProduct => product.data as IProduct,
);

export const productListSelector = createSelector(
  rootSelector,
  (product: IProductState): IProduct[] => product.list,
);

export const productSuccessSelector = createSelector(
  rootSelector,
  (product: IProductState): string => product.success,
);

export const productErrorSelector = createSelector(
  rootSelector,
  (product: IProductState): string => product.error,
);

export const isLoadingSelector = createSelector(
  rootSelector,
  (product: IProductState): boolean => product.isLoading,
);
