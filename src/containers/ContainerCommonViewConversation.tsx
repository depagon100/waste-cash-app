import React from 'react';
import { connect } from 'react-redux';
import { Socket } from 'socket.io-client';

import { WithSocket as withSocket } from '@/atoms/index';
import { ScreenViewConversation } from '@/components/screens/ScreenCommon/ScreenViewConversation';
import {
  addConversationDataMessage,
  getConversation,
  seenConversationMessages,
  sendMessage,
} from '@/state/conversation/actions';
import {
  conversationDataSelector,
  isLoadingSelector,
} from '@/state/conversation/selectors';
import { AppDispatch, RootState } from '@/state/store';
import { userDataSelector } from '@/state/user/selectors';

const mapActionCreators = (dispatch: AppDispatch) => ({
  addConversationDataMessage(params: Objects.Message): void {
    dispatch(addConversationDataMessage(params));
  },
  getConversationData(params: {
    conversationId?: number;
    recipientId?: number;
  }): void {
    dispatch(getConversation(params));
  },
  seenMessages(params: { conversationId: number }): void {
    dispatch(seenConversationMessages(params));
  },
  sendMessage(params: {
    socket: Socket;
    conversationId?: number;
    recipientId?: number;
    content: string;
  }): void {
    dispatch(sendMessage(params));
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    conversationData: conversationDataSelector(state),
    isLoading: isLoadingSelector(state),
    me: userDataSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(withSocket(ScreenViewConversation));
