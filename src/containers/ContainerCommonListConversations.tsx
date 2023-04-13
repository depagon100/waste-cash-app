import React from 'react';
import { connect } from 'react-redux';

import { ScreenListConversations } from '@/components/screens/ScreenCommon/ScreenListConversations';
import { conversationListSelector } from '@/state/conversation/selectors';
import { AppDispatch, RootState } from '@/state/store';
import { userDataSelector } from '@/state/user/selectors';

const mapActionCreators = (dispatch: AppDispatch) => ({});

const mapStateToProps = (state: RootState) => {
  return {
    conversationList: conversationListSelector(state),
    userData: userDataSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(ScreenListConversations);
