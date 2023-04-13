import React from 'react';
import { connect } from 'react-redux';

import { ScreenBuyerViewMap } from '@/components/screens/ScreenBuyer/ScreenBuyerViewMap';
import { productDataSelector } from '@/state/product/selectors';
import { createReview, setReviewSuccess } from '@/state/review/actions';
import {
  isLoadingSelector,
  productReviewErrorSelector,
  productReviewSuccessSelector,
} from '@/state/review/selectors';
import { AppDispatch, RootState } from '@/state/store';
import { userDataSelector } from '@/state/user/selectors';

const mapActionCreators = (dispatch: AppDispatch) => ({
  createProductReview(params: { rate: number; feedback?: string }): void {
    dispatch(createReview(params));
  },
  setProductReviewSuccess(message: string): void {
    dispatch(setReviewSuccess(message));
  },
});

const mapStateToProps = (state: RootState) => ({
  error: productReviewErrorSelector(state),
  isLoading: isLoadingSelector(state),
  productData: productDataSelector(state),
  success: productReviewSuccessSelector(state),
  userData: userDataSelector(state),
});

export default connect(mapStateToProps, mapActionCreators)(ScreenBuyerViewMap);
