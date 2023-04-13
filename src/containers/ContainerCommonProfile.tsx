import React from 'react';
import { connect } from 'react-redux';

import { ScreenProfile } from '@/components/screens/ScreenCommon/ScreenProfile';
import { reviewListSelector } from '@/state/review/selectors';
import { AppDispatch, RootState } from '@/state/store';
import { signOut, updateUser } from '@/state/user/actions';
import { isLoadingSelector, userDataSelector } from '@/state/user/selectors';

const mapActionCreators = (dispatch: AppDispatch) => ({
  signOut(): void {
    dispatch(signOut());
  },
  updateUser(params: Partial<Objects.User>): void {
    dispatch(updateUser(params));
  },
});

const mapStateToProps = (state: RootState) => ({
  isLoading: isLoadingSelector(state),
  reviewList: reviewListSelector(state),
  userData: userDataSelector(state),
});

export default connect(mapStateToProps, mapActionCreators)(ScreenProfile);
