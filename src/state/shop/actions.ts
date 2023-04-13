import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Shop } from '@/services/index';

import { setAppError } from '../app/actions';
import { ShopActions } from './constants';

export const getShops = createAsyncThunk(
  ShopActions.GET_SHOP_LIST,
  async (_, thunkAPI) => {
    try {
      const getShopsRes = await Shop.getShops();
      const shops: Objects.User[] = getShopsRes.data;

      return Promise.resolve({ list: shops });
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
