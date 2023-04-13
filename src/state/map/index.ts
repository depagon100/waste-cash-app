import { createSlice } from '@reduxjs/toolkit';

import { setMapData } from './actions';

const initialState: State.Map = {};

export const mapSlice = createSlice({
  extraReducers: {
    // Set Map Data
    [`${setMapData.type}`]: (
      state,
      action: { payload: Objects.Map | undefined },
    ) => ({
      ...state,
      data: action.payload,
    }),
  },
  initialState,
  name: 'map',
  reducers: {},
});
