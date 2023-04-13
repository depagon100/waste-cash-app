import { StackActions } from '@react-navigation/native';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ProductOfferStatus } from '@/constants/index';
import { Product, Review } from '@/services/index';

import { setAppError } from '../app/actions';
import navigate from '../navigation';
import { setProductReview } from '../product/actions';
import { productDataSelector } from '../product/selectors';
import { RootState } from '../store';
import { tokenSelector } from '../user/selectors';
import { ReviewActions } from './constants';

export const setReviewError = createAction<string | null>(
  ReviewActions.SET_REVIEW_ERROR,
);

export const setReviewSuccess = createAction<string | null>(
  ReviewActions.SET_REVIEW_SUCCESS,
);

export const createReview = createAsyncThunk(
  ReviewActions.CREATE_REVIEW,
  async (
    params: {
      rate: number;
      feedback?: string;
    },
    thunkAPI,
  ) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);
      const productData = productDataSelector(state);

      const createdProductReview = await Product.createProductReview({
        feedback: params.feedback || '',
        productId: productData.id,
        rate: `${params.rate}`,
        token,
      });

      // set review in product data
      if (createdProductReview.status === 201) {
        thunkAPI.dispatch(setProductReview(createdProductReview.data));
      }

      return Promise.resolve('Review submitted succesfully.');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response) {
          const axiosError = error?.response as Objects.ServiceError;
          if (axiosError?.status && axiosError.status === 400) {
            return thunkAPI.rejectWithValue(axiosError.data.message);
          }
        }
      }

      // set global error
      thunkAPI.dispatch(setAppError('Server is busy. Please try again later.'));

      return Promise.resolve();
    }
  },
);

export const getReviews = createAsyncThunk(
  ReviewActions.GET_REVIEW_LIST,
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);

      const getReviewsRes = await Review.getReviews({ token });
      const reviews: Objects.Review[] = getReviewsRes.data;

      return Promise.resolve({ list: reviews });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response) {
          const axiosError = error?.response as Objects.ServiceError;
          if (axiosError?.status && axiosError.status === 400) {
            return thunkAPI.rejectWithValue(axiosError.data.message);
          }
        }
      }

      // set global error
      thunkAPI.dispatch(setAppError('Server is busy. Please try again later.'));

      return Promise.reject();
    }
  },
);
