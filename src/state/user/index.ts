import { createSlice } from '@reduxjs/toolkit';

import {
  setUserData,
  setUserError,
  setUserIsLoading,
  setUserToken,
  signIn,
  signOut,
  updateUser,
} from './actions';

const initialState: State.User = {
  data: undefined,
  error: '',
  isLoading: false,
  token: '',
};

export const userSlice = createSlice({
  extraReducers: {
    // Sign In
    [`${signIn.pending}`]: (state) => ({
      ...state,
      error: '',
      isLoading: true,
    }),
    [`${signIn.fulfilled}`]: (state) => ({
      ...state,
      error: '',
      isLoading: false,
    }),
    [`${signIn.rejected}`]: (state, action: { error: Error }) => ({
      ...state,
      error: action.error.message,
      isLoading: false,
    }),

    // Sign Out
    [`${signOut.pending}`]: (state) => ({
      ...state,
      error: '',
      isLoading: true,
    }),
    [`${signOut.fulfilled}`]: (state) => ({
      ...state,
      error: '',
      isLoading: false,
    }),
    [`${signOut.rejected}`]: (state) => ({
      ...state,
      isLoading: false,
    }),

    // Update User
    [`${updateUser.pending}`]: (state) => ({
      ...state,
      error: '',
      isLoading: true,
    }),
    [`${updateUser.fulfilled}`]: (state) => ({
      ...state,
      error: '',
      isLoading: false,
    }),
    [`${updateUser.rejected}`]: (state, action: { error: Error }) => ({
      ...state,
      error: action.error.message,
      isLoading: false,
    }),

    // Set User Data
    [`${setUserData.type}`]: (state, action: { payload?: Objects.User }) => ({
      ...state,
      data: action.payload
        ? {
            ...state.data,
            ...action.payload,
          }
        : undefined,
    }),

    // Set User Error
    [`${setUserError.type}`]: (state, action: { payload?: string }) => ({
      ...state,
      error: action.payload || '',
    }),

    // Set User Token
    [`${setUserToken.type}`]: (state, action: { payload?: string }) => ({
      ...state,
      token: action.payload || '',
    }),

    // Set User Is Loading
    [`${setUserIsLoading.type}`]: (state, action: { payload?: boolean }) => ({
      ...state,
      isLoading: action.payload || false,
    }),
  },
  initialState,
  name: 'user',
  reducers: {},
});
