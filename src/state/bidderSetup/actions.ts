import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Product } from '@/services/index';

import { setAppError } from '../app/actions';
import { setProductBidderSetup } from '../product/actions';
import { productDataSelector } from '../product/selectors';
import { RootState } from '../store';
import { tokenSelector } from '../user/selectors';
import { BidderSetupActions } from './constants';

export const setBidderSetupSuccess = createAction<string | null>(
  BidderSetupActions.SET_BIDDER_SETUP_SUCCESS,
);

export const createProductBidderSetup = createAsyncThunk(
  BidderSetupActions.CREATE_BIDDER_SETUP,
  async (
    params: {
      date: string;
      time: string;
      location: string;
      latitude: string;
      longitude: string;
      mop: string;
    },
    thunkAPI,
  ) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);
      const productData = productDataSelector(state);

      const createBidderSetup = await Product.createProductBidderSetup({
        ...params,
        productId: productData.id,
        token,
      });

      // set bidder setup in product data
      if (createBidderSetup.status === 201) {
        thunkAPI.dispatch(setProductBidderSetup(createBidderSetup.data));
      }

      return Promise.resolve('Setup was sucessfully saved');
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

export const updateProductBidderSetup = createAsyncThunk(
  BidderSetupActions.UPDATE_BIDDER_SETUP,
  async (
    params: {
      date?: string;
      time?: string;
      address?: {
        location?: string;
        latitude?: string;
        longitude?: string;
      };
      mop?: string;
    },
    thunkAPI,
  ) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);
      const productData = productDataSelector(state);

      if (!productData?.bidderSetup) {
        throw new Error('Bidder Setup does not exist');
      }

      const updateBidderSetup = await Product.updateProductBidderSetup({
        ...params,
        bidderSetupId: productData?.bidderSetup?.id,
        productId: productData.id,
        token,
      });

      // set bidder setup in product data
      if (updateBidderSetup.status === 200) {
        thunkAPI.dispatch(setProductBidderSetup(updateBidderSetup.data));
      }

      return Promise.resolve('Setup was sucessfully updated');
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
