import { StackActions } from '@react-navigation/native';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ProductOfferStatus } from '@/constants/index';
import { Product } from '@/services/index';

import { setAppError } from '../app/actions';
import navigate from '../navigation';
import {
  acceptProductOffer as acceptOffer,
  addProductOffer,
  removeProductOffer,
} from '../product/actions';
import { productDataSelector } from '../product/selectors';
import { RootState } from '../store';
import { tokenSelector } from '../user/selectors';
import { ProductOfferActions } from './constants';

export const setProductOfferError = createAction<string | null>(
  ProductOfferActions.SET_PRODUCT_OFFER_ERROR,
);

export const setProductOfferSuccess = createAction<string | null>(
  ProductOfferActions.SET_PRODUCT_OFFER_SUCCESS,
);

export const createProductOffer = createAsyncThunk(
  ProductOfferActions.CREATE_PRODUCT_OFFER,
  async (
    params: {
      price: number;
    },
    thunkAPI,
  ) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);
      const productData = productDataSelector(state);

      const createdProductOffer = await Product.createProductOffer({
        price: params.price,
        productId: productData.id,
        token,
      });

      // add offer in product data
      if (createdProductOffer.status === 201) {
        thunkAPI.dispatch(addProductOffer(createdProductOffer.data));
      }

      return Promise.resolve('Offer submitted succesfully.');
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

export const acceptProductOffer = createAsyncThunk(
  ProductOfferActions.ACCEPT_PRODUCT_OFFER,
  async (
    params: {
      offerId: number;
    },
    thunkAPI,
  ) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);
      const productData = productDataSelector(state);
      const offer = productData.offers.find(
        (productOffer) => productOffer.id === params.offerId,
      );

      const acceptProductOfferRes = await Product.updateProductOffer({
        productId: productData.id,
        productOfferId: params.offerId,
        status: ProductOfferStatus.ACCEPTED,
        token,
      });

      // update product data and set the bidder
      thunkAPI.dispatch(
        acceptOffer({
          buyer: acceptProductOfferRes.data.user,
          offerId: offer?.id as number,
        }),
      );

      // redirect to bidderSetup page
      navigate()?.dispatch(StackActions.replace('SellerBidderSetup'));

      return Promise.resolve();
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

export const rejectProductOffer = createAsyncThunk(
  ProductOfferActions.REJECT_PRODUCT_OFFER,
  async (
    params: {
      offerId: number;
    },
    thunkAPI,
  ) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);
      const productData = productDataSelector(state);

      await Product.updateProductOffer({
        productId: productData.id,
        productOfferId: params.offerId,
        status: ProductOfferStatus.REJECTED,
        token,
      });

      // remove offer in product data
      thunkAPI.dispatch(removeProductOffer(params.offerId));

      return Promise.resolve();
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
