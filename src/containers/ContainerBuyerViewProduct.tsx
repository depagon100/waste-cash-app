import React from 'react';
import { connect } from 'react-redux';

import { ScreenBuyerViewProduct } from '@/components/screens/ScreenBuyer/ScreenBuyerViewProduct';
import { getProduct } from '@/state/product/actions';
import {
  isLoadingSelector as productLoadingSelector,
  productDataSelector,
  productOfferDataSelector,
} from '@/state/product/selectors';
import {
  createProductOffer,
  setProductOfferSuccess,
} from '@/state/productOffer/actions';
import {
  isLoadingSelector as productOfferLoadingSelector,
  productOfferSuccessSelector,
} from '@/state/productOffer/selectors';
import { AppDispatch, RootState } from '@/state/store';
import { userDataSelector } from '@/state/user/selectors';

const mapActionCreators = (dispatch: AppDispatch) => ({
  createProductOffer(params: { price: number }): void {
    dispatch(createProductOffer(params));
  },
  getProduct(id: number): void {
    dispatch(getProduct(id));
  },
  setProductOfferSuccess(message: string): void {
    dispatch(setProductOfferSuccess(message));
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    isProductLoading: productLoadingSelector(state),
    isProductOfferLoading: productOfferLoadingSelector(state),
    me: userDataSelector(state),
    productData: productDataSelector(state),
    productOfferData: productOfferDataSelector(state),
    success: productOfferSuccessSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(ScreenBuyerViewProduct);
