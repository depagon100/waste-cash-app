import { createAction } from '@reduxjs/toolkit';

import { MapActions } from './constants';

export const setMapData = createAction<Objects.Map | undefined>(
  MapActions.SET_MAP_DATA,
);
