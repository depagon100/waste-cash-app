import { createSlice } from '@reduxjs/toolkit';

import { getShops } from './actions';

const initialState: State.Shop = {
  error: '',
  isLoading: false,
  list: [],
};

export const shopSlice = createSlice({
  extraReducers: {
    // Get Shops
    [`${getShops.pending}`]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [`${getShops.fulfilled}`]: (
      state,
      action: { payload: { list: Objects.User[] } },
    ) => ({
      ...state,
      isLoading: false,
      list: action.payload.list,
    }),
    [`${getShops.rejected}`]: (state) => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState,
  name: 'shop',
  reducers: {},
});
