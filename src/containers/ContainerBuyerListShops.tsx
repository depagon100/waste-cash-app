import React from 'react';
import { connect } from 'react-redux';

import { ScreenBuyerListShops } from '@/components/screens/ScreenBuyer/ScreenBuyerListShops';
import { getShops } from '@/state/shop/actions';
import { isLoadingSelector, shopListSelector } from '@/state/shop/selectors';
import { AppDispatch, RootState } from '@/state/store';

const mapActionCreators = (dispatch: AppDispatch) => ({
  getShops(): void {
    dispatch(getShops());
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: isLoadingSelector(state),
    shopList: shopListSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(ScreenBuyerListShops);
