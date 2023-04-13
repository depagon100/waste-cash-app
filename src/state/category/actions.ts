import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Category } from '@/services/index';

import { setAppError } from '../app/actions';
import { CategoryActions } from './constants';

export const getCategories = createAsyncThunk(
  CategoryActions.GET_CATEGORY_LIST,
  async (_, thunkAPI) => {
    try {
      const getCategoriesRes = await Category.getCategories();
      const categories: Objects.Category[] = getCategoriesRes.data;

      return Promise.resolve({ list: categories });
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
