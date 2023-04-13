import React from 'react';
import { connect } from 'react-redux';

import { ScreenBuyerBrowseMap } from '@/components/screens/ScreenBuyer/ScreenBuyerBrowseMap';
import { productListSelector } from '@/state/product/selectors';
import { AppDispatch, RootState } from '@/state/store';

const mapActionCreators = (dispatch: AppDispatch) => ({});

const mapStateToProps = (state: RootState) => {
  return {
    productList: productListSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(ScreenBuyerBrowseMap);
