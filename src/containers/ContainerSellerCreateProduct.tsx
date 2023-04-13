import React from 'react';
import { connect } from 'react-redux';

import { ScreenSellerCreateProduct } from '@/components/screens/ScreenSeller/ScreenSellerCreateProduct';
import { getCategories } from '@/state/category/actions';
import {
  categoryListSelector,
  isLoadingSelector as isCategoryLoadingSelector,
} from '@/state/category/selectors';
import { setMapData } from '@/state/map/actions';
import { mapDataSelector } from '@/state/map/selectors';
import { createProduct, setProductSuccess } from '@/state/product/actions';
import {
  isLoadingSelector,
  productSuccessSelector,
} from '@/state/product/selectors';
import { AppDispatch, RootState } from '@/state/store';

const mapActionCreators = (dispatch: AppDispatch) => ({
  clearMapData(): void {
    dispatch(setMapData(undefined));
  },
  createProduct(
    params: Partial<Omit<Objects.Product, 'category'>> & {
      category: string;
      photo: any;
    },
  ): void {
    dispatch(createProduct(params));
  },
  getCategories(): void {
    dispatch(getCategories());
  },
  setProductSuccess(success: string): void {
    dispatch(setProductSuccess(success));
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    categoryList: categoryListSelector(state),
    isCategoryLoading: isCategoryLoadingSelector(state),
    isProductLoading: isLoadingSelector(state),
    mapData: mapDataSelector(state),
    success: productSuccessSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(ScreenSellerCreateProduct);
