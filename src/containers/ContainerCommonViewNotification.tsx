import React from 'react';
import { connect } from 'react-redux';

import { ScreenViewNotification } from '@/components/screens/ScreenCommon/ScreenViewNotification';
import { seenNotification } from '@/state/notification/actions';
import { AppDispatch, RootState } from '@/state/store';
import { userDataSelector } from '@/state/user/selectors';

const mapActionCreators = (dispatch: AppDispatch) => ({
  seenNotification(notificationId: number): void {
    dispatch(seenNotification({ notificationId }));
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    me: userDataSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(ScreenViewNotification);
