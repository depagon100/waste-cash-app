import { createSlice } from '@reduxjs/toolkit';

import {
  createProductBidderSetup,
  setBidderSetupSuccess,
  updateProductBidderSetup,
} from './actions';

const initialState: State.BidderSEtup = {
  error: '',
  isLoading: false,
  success: '',
};

export const bidderSetupSlice = createSlice({
  extraReducers: {
    // Create Product Bidder Setup
    [`${createProductBidderSetup.pending}`]: (state) => ({
      ...state,
      error: '',
      isLoading: true,
      success: '',
    }),
    [`${createProductBidderSetup.fulfilled}`]: (
      state,
      action: { payload: string },
    ) => ({
      ...state,
      isLoading: false,
      success: action.payload,
    }),
    [`${createProductBidderSetup.rejected}`]: (
      state,
      action: { payload: string },
    ) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }),

    // Update Product Bidder Setup
    [`${updateProductBidderSetup.pending}`]: (state) => ({
      ...state,
      error: '',
      isLoading: true,
      success: '',
    }),
    [`${updateProductBidderSetup.fulfilled}`]: (
      state,
      action: { payload: string },
    ) => ({
      ...state,
      isLoading: false,
      success: action.payload,
    }),
    [`${updateProductBidderSetup.rejected}`]: (
      state,
      action: { payload: string },
    ) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }),

    // Set Bidder Setup Success
    [`${setBidderSetupSuccess.type}`]: (
      state,
      action: { payload: string | null },
    ) => ({
      ...state,
      success: !action.payload ? '' : action.payload,
    }),
  },
  initialState,
  name: 'bidderSetup',
  reducers: {},
});
