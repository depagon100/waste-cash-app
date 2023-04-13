import React from 'react';
import { connect } from 'react-redux';

import { ScreenListNotifications } from '@/components/screens/ScreenCommon/ScreenListNotifications';
import { notificationListSelector } from '@/state/notification/selectors';
import { AppDispatch, RootState } from '@/state/store';
import { userDataSelector } from '@/state/user/selectors';

const mapActionCreators = (dispatch: AppDispatch) => ({});

const mapStateToProps = (state: RootState) => {
  return {
    me: userDataSelector(state),
    notificationList: notificationListSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(ScreenListNotifications);
