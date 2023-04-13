import React from 'react';
import { connect } from 'react-redux';

import { WithSocket as withSocket } from '@/atoms/index';
import { MainNavigation } from '@/navigations/MainNavigation';
import { initialize } from '@/state/app/actions';
import { isInitializeSelector } from '@/state/app/selectors';
import { addConversationListMessage } from '@/state/conversation/actions';
import { hasUnseenConversationSelector } from '@/state/conversation/selectors';
import { hasUnseenNotificationSelector } from '@/state/notification/selectors';
import { AppDispatch, RootState } from '@/state/store';
import { isAuthSelector, userDataSelector } from '@/state/user/selectors';

const mapActionCreators = (dispatch: AppDispatch) => ({
  addConversationListMessage(params: Objects.Message): void {
    dispatch(addConversationListMessage(params));
  },
  initialize(): void {
    dispatch(initialize());
  },
});

const mapStateToProps = (state: RootState) => ({
  hasUnseenConversation: hasUnseenConversationSelector(state),
  hasUnseenNotification: hasUnseenNotificationSelector(state),
  isAuth: isAuthSelector(state),
  isInitialize: isInitializeSelector(state),
  me: userDataSelector(state),
});

export default connect(
  mapStateToProps,
  mapActionCreators,
)(withSocket(MainNavigation));
