import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { UserRoles } from '@/constants/index';
import { Product } from '@/services/index';

import { setAppError } from '../app/actions';
import { RootState } from '../store';
import { tokenSelector, userDataSelector } from '../user/selectors';
import { ProductActions } from './constants';

export const setProductSuccess = createAction<string | null>(
  ProductActions.SET_PRODUCT_SUCCESS,
);

export const setProductBidderSetup = createAction<Objects.BidderSetup>(
  ProductActions.SET_PRODUCT_BIDDER_SETUP,
);

export const setProductReview = createAction<Objects.Review>(
  ProductActions.SET_PRODUCT_REVIEW,
);

export const acceptProductOffer = createAction<{
  offerId: number;
  buyer: Objects.User;
}>(ProductActions.ACCEP_PRODUCT_OFFER);

export const addProductOffer = createAction<Objects.ProductOffer>(
  ProductActions.ADD_PRODUCT_OFFER,
);

export const removeProductOffer = createAction<number>(
  ProductActions.REMOVE_PRODUCT_OFFER,
);

export const createProduct = createAsyncThunk(
  ProductActions.CREATE_PRODUCT,
  async (
    params: Partial<Omit<Objects.Product, 'category'>> & {
      category: string;
      photo: any;
    },
    thunkAPI,
  ) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);
      const formData = new FormData();

      formData.append('image', {
        name: params.photo.fileName,
        type: params.photo.type,
        uri: params.photo.uri,
      });
      formData.append('name', params.name);
      formData.append('category', params.category);
      formData.append('description', params.description);
      formData.append('price', params.price);
      formData.append('location', params?.address?.location || '');
      formData.append('latitude', params?.address?.latitude || '');
      formData.append('longitude', params?.address?.longitude || '');
      formData.append('status', params.status);

      const createProductRes = await Product.createProduct({ formData, token });
      const product: Objects.Product = createProductRes.data;

      return Promise.resolve({ data: product });
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

export const deleteProduct = createAsyncThunk(
  ProductActions.DELETE_PRODUCT,
  async (id: number, thunkAPI) => {
    try {
      await Product.deleteProduct(id);

      return Promise.resolve(id);
    } catch (error) {
      console.error(error);

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

export const getProduct = createAsyncThunk(
  ProductActions.GET_PRODUCT_DATA,
  async (id: number, thunkAPI) => {
    try {
      const getProductRes = await Product.getProduct(id);

      return Promise.resolve({ data: getProductRes.data });
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

export const getProducts = createAsyncThunk(
  ProductActions.GET_PRODUCT_LIST,
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const user = userDataSelector(state);

      let products: Objects.Product[] = [];
      if (user.role === UserRoles.BUYER) {
        const getProductsRes = await Product.getProducts();
        products = getProductsRes.data;
      } else if (user.role === UserRoles.SELLER) {
        const token = tokenSelector(state);
        const getOwnerProductsRes = await Product.getOwnerProducts({ token });
        products = getOwnerProductsRes.data;
      }

      return Promise.resolve({ list: products });
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
