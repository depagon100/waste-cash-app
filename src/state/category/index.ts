import { createSlice } from '@reduxjs/toolkit';

import { getCategories } from './actions';

const initialState: State.Category = {
  error: '',
  isLoading: false,
  list: [],
};

export const categorySlice = createSlice({
  extraReducers: {
    // Get Categories
    [`${getCategories.pending}`]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [`${getCategories.fulfilled}`]: (
      state,
      action: { payload: { list: Objects.Category[] } },
    ) => ({
      ...state,
      isLoading: false,
      list: action.payload.list,
    }),
    [`${getCategories.rejected}`]: (state) => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState,
  name: 'category',
  reducers: {},
});
