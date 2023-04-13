import React from 'react';
import { connect } from 'react-redux';

import { ScreenSellerBidderSetup } from '@/components/screens/ScreenSeller/ScreenSellerBidderSetup';
import {
  createProductBidderSetup,
  setBidderSetupSuccess,
  updateProductBidderSetup,
} from '@/state/bidderSetup/actions';
import {
  bidderSetupSuccessSelector,
  isLoadingSelector,
} from '@/state/bidderSetup/selectors';
import { setMapData } from '@/state/map/actions';
import { mapDataSelector } from '@/state/map/selectors';
import { productDataSelector } from '@/state/product/selectors';
import { AppDispatch, RootState } from '@/state/store';

const mapActionCreators = (dispatch: AppDispatch) => ({
  clearMapData(): void {
    dispatch(setMapData(undefined));
  },
  createProductBidderSetup(params: {
    date: string;
    time: string;
    location: string;
    latitude: string;
    longitude: string;
    mop: string;
  }): void {
    dispatch(createProductBidderSetup(params));
  },
  setBidderSetupSuccess(success: string): void {
    dispatch(setBidderSetupSuccess(success));
  },
  updateProductBidderSetup(params: {
    date?: string;
    time?: string;
    address?: {
      location?: string;
      latitude?: string;
      longitude?: string;
    };
    mop?: string;
  }): void {
    dispatch(updateProductBidderSetup(params));
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: isLoadingSelector(state),
    mapData: mapDataSelector(state),
    productData: productDataSelector(state),
    success: bidderSetupSuccessSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(ScreenSellerBidderSetup);
