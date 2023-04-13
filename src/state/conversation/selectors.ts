import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { userDataSelector } from '../user/selectors';

const rootSelector = createSelector(
  (state: RootState): State.Conversation => state.conversation,
  (conversation: State.Conversation) => conversation,
);

export const conversationDataSelector = createSelector(
  rootSelector,
  (conversation: State.Conversation): Objects.Conversation =>
    conversation.data!,
);

export const conversationListSelector = createSelector(
  rootSelector,
  (conversation: State.Conversation): Objects.ConversationSummary[] =>
    conversation.list,
);

export const hasUnseenConversationSelector = createSelector(
  conversationListSelector,
  userDataSelector,
  (
    conversationList: Objects.ConversationSummary[],
    userData: Objects.User,
  ): boolean =>
    conversationList.some(
      (conversation) =>
        !conversation?.message?.isSeen &&
        conversation?.recipient?.id === userData?.id,
    ),
);

export const hasUnseenMessageDataSelector = createSelector(
  conversationDataSelector,
  userDataSelector,
  (conversationData: Objects.Conversation, userData: Objects.User): boolean =>
    conversationData.messages.some(
      (message) => !message.isSeen && message.recipient.id === userData.id,
    ),
);

export const conversationErrorSelector = createSelector(
  rootSelector,
  (conversation: State.Conversation): string => conversation.error,
);

export const isLoadingSelector = createSelector(
  rootSelector,
  (conversation: State.Conversation): boolean => conversation.isLoading,
);
