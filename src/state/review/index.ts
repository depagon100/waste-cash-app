import { createSlice } from '@reduxjs/toolkit';

import {
  createReview,
  getReviews,
  setReviewError,
  setReviewSuccess,
} from './actions';

const initialState: State.Review = {
  error: '',
  isLoading: false,
  list: [],
  success: '',
};

export const productReview = createSlice({
  extraReducers: {
    // Create Product Review
    [`${createReview.pending}`]: (state) => ({
      ...state,
      error: '',
      isLoading: true,
      success: '',
    }),
    [`${createReview.fulfilled}`]: (state, action: { payload: string }) => ({
      ...state,
      isLoading: false,
      success: action.payload,
    }),
    [`${createReview.rejected}`]: (state, action: { payload: string }) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }),

    // Get Reviews
    [`${getReviews.pending}`]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [`${getReviews.fulfilled}`]: (
      state,
      action: { payload: { list: Objects.Review[] } },
    ) => ({
      ...state,
      isLoading: false,
      list: action.payload.list,
    }),
    [`${getReviews.rejected}`]: (state) => ({
      ...state,
      isLoading: false,
    }),

    // Set Product Review Error
    [`${setReviewError.type}`]: (state, action) => ({
      ...state,
      error: action.payload || '',
    }),

    // Set Product Review Success
    [`${setReviewSuccess.type}`]: (state, action) => ({
      ...state,
      success: action.payload || '',
    }),
  },
  initialState,
  name: 'review',
  reducers: {},
});
