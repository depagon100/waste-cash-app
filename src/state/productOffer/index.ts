import { createSlice } from '@reduxjs/toolkit';

import {
  createProductOffer,
  rejectProductOffer,
  setProductOfferError,
  setProductOfferSuccess,
} from './actions';

const initialState: State.ProductOffer = {
  error: '',
  isLoading: false,
  success: '',
};

export const productOfferSlice = createSlice({
  extraReducers: {
    // Create Product Offer
    [`${createProductOffer.pending}`]: (state) => ({
      ...state,
      error: '',
      isLoading: true,
      success: '',
    }),
    [`${createProductOffer.fulfilled}`]: (
      state,
      action: { payload: string },
    ) => ({
      ...state,
      isLoading: false,
      success: action.payload,
    }),
    [`${createProductOffer.rejected}`]: (
      state,
      action: { payload: string },
    ) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }),

    // Reject Product Offer
    [`${rejectProductOffer.pending}`]: (state) => ({
      ...state,
      error: '',
      isLoading: true,
    }),
    [`${rejectProductOffer.fulfilled}`]: (state) => ({
      ...state,
      isLoading: false,
    }),
    [`${rejectProductOffer.rejected}`]: (
      state,
      action: { payload: string },
    ) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }),

    // Set Product Offer Error
    [`${setProductOfferError.type}`]: (state, action) => ({
      ...state,
      error: action.payload || '',
    }),

    // Set Product Offer Success
    [`${setProductOfferSuccess.type}`]: (state, action) => ({
      ...state,
      success: action.payload || '',
    }),
  },
  initialState,
  name: 'productOffer',
  reducers: {},
});
