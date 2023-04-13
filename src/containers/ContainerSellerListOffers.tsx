import React from 'react';
import { connect } from 'react-redux';

import { ScreenSellerListOffers } from '@/components/screens/ScreenSeller/ScreenSellerListOffers';
import {
  productDataSelector,
  productPendingOfferListSelector,
} from '@/state/product/selectors';
import {
  acceptProductOffer,
  rejectProductOffer,
} from '@/state/productOffer/actions';
import { isLoadingSelector } from '@/state/productOffer/selectors';
import { AppDispatch, RootState } from '@/state/store';

const mapActionCreators = (dispatch: AppDispatch) => ({
  acceptProductOffer(offerId: number): void {
    dispatch(acceptProductOffer({ offerId }));
  },
  rejectProductOffer(offerId: number): void {
    dispatch(rejectProductOffer({ offerId }));
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: isLoadingSelector(state),
    productData: productDataSelector(state),
    productOfferList: productPendingOfferListSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(ScreenSellerListOffers);
