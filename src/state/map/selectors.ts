import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const rootSelector = createSelector(
  (state: RootState): State.Map => state.map,
  (map: State.Map) => map,
);

export const mapDataSelector = createSelector(
  rootSelector,
  (map: State.Map): Objects.Map | undefined => map?.data,
);
