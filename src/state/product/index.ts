import { createSlice } from '@reduxjs/toolkit';

import { ProductOfferStatus } from '@/constants/index';

import {
  acceptProductOffer,
  addProductOffer,
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  removeProductOffer,
  setProductBidderSetup,
  setProductReview,
  setProductSuccess,
} from './actions';

const initialState: State.Product = {
  error: '',
  isLoading: false,
  list: [],
  success: '',
};

export const productSlice = createSlice({
  extraReducers: {
    // Create Product
    [`${createProduct.pending}`]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [`${createProduct.fulfilled}`]: (
      state,
      action: { payload: { data: Objects.Product } },
    ) => ({
      ...state,
      isLoading: false,
      list: [...state.list, action.payload.data],
      success: 'Product succesfully created.',
    }),
    [`${createProduct.rejected}`]: (state) => ({
      ...state,
      isLoading: false,
    }),

    // Get Product
    [`${getProduct.pending}`]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [`${getProduct.fulfilled}`]: (
      state,
      action: { payload: { data: Objects.Product } },
    ) => ({
      ...state,
      data: {
        ...state.data,
        ...action.payload.data,
      },
      isLoading: false,
    }),
    [`${getProduct.rejected}`]: (state) => ({
      ...state,
      isLoading: false,
    }),

    // Get Products
    [`${getProducts.pending}`]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [`${getProducts.fulfilled}`]: (
      state,
      action: { payload: { list: Objects.Product[] } },
    ) => ({
      ...state,
      isLoading: false,
      list: action.payload.list,
    }),
    [`${getProducts.rejected}`]: (state) => ({
      ...state,
      isLoading: false,
    }),

    // Delete Product
    [`${deleteProduct.pending}`]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [`${deleteProduct.fulfilled}`]: (state, action: { payload: number }) => {
      const { payload: id } = action;

      const productList = state.list.filter((product) => product.id !== id);

      return {
        ...state,
        ...(state?.data && {
          data: {
            ...state.data,
            deletedAt: `${new Date()}`,
          },
        }),
        isLoading: false,
        list: productList,
      };
    },
    [`${deleteProduct.rejected}`]: (state) => ({
      ...state,
      isLoading: false,
    }),

    // Accept Product Offer
    [`${acceptProductOffer.type}`]: (
      state,
      action: { payload: { offerId: number; buyer: Objects.User } },
    ) => {
      if (state.data?.offers.length) {
        return {
          ...state,
          data: {
            ...state.data,
            bidder: action.payload.buyer,
            offers: state.data?.offers.map((offer) => {
              if (offer.id === action.payload.offerId) {
                return {
                  ...offer,
                  status: ProductOfferStatus.ACCEPTED,
                };
              }
              return offer;
            }),
          },
        };
      }

      return state;
    },

    // Add Product Offer
    [`${addProductOffer.type}`]: (
      state,
      action: { payload: Objects.ProductOffer },
    ) => {
      if (state.data) {
        return {
          ...state,
          data: {
            ...state.data,
            offers: [...(state.data?.offers || []), action.payload],
          },
        };
      }

      return state;
    },

    // Remove Product Offer
    [`${removeProductOffer.type}`]: (state, action: { payload: number }) => {
      if (state.data?.offers.length) {
        return {
          ...state,
          data: {
            ...state.data,
            offers: state.data?.offers.filter(
              (offer) => offer.id !== action.payload,
            ),
          },
        };
      }

      return state;
    },

    // Set Product Bidder Setup
    [`${setProductBidderSetup.type}`]: (
      state,
      action: { payload: Objects.BidderSetup },
    ) => {
      if (state?.data) {
        return {
          ...state,
          data: {
            ...state.data,
            bidderSetup: action.payload,
          },
        };
      }

      return state;
    },

    // Set Product Review
    [`${setProductReview.type}`]: (
      state,
      action: { payload: Objects.Review },
    ) => {
      if (state.data) {
        return {
          ...state,
          data: {
            ...state.data,
            review: action.payload,
          },
        };
      }

      return state;
    },

    // Set Product Success
    [`${setProductSuccess.type}`]: (
      state,
      action: { payload: string | null },
    ) => ({
      ...state,
      success: !action.payload ? '' : action.payload,
    }),
  },
  initialState,
  name: 'product',
  reducers: {},
});
