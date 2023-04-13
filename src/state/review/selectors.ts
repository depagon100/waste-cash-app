import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const rootSelector = createSelector(
  (state: RootState): State.Review => state.productReview,
  (review: State.Review) => review,
);

export const productReviewSuccessSelector = createSelector(
  rootSelector,
  (review: State.Review): string => review.success,
);

export const productReviewErrorSelector = createSelector(
  rootSelector,
  (review: State.Review): string => review.error,
);

export const isLoadingSelector = createSelector(
  rootSelector,
  (review: State.Review): boolean => review.isLoading,
);

export const reviewListSelector = createSelector(
  rootSelector,
  (review: State.Review): Objects.Review[] => review.list,
);
