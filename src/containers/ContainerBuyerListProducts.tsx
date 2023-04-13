import React from 'react';
import { connect } from 'react-redux';

import { ScreenBuyerListProducts } from '@/components/screens/ScreenBuyer/ScreenBuyerListProducts';
import { getProducts } from '@/state/product/actions';
import {
  isLoadingSelector,
  productListSelector,
} from '@/state/product/selectors';
import { AppDispatch, RootState } from '@/state/store';

const mapActionCreators = (dispatch: AppDispatch) => ({
  getProducts(): void {
    dispatch(getProducts());
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: isLoadingSelector(state),
    productList: productListSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(ScreenBuyerListProducts);
