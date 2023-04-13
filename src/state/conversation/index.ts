import { createSlice } from '@reduxjs/toolkit';

import {
  addConversationDataMessage,
  addConversationListMessage,
  getConversation,
  getConversations,
  seenConversationMessages,
  setConversationData,
} from './actions';

const initialState: State.Conversation = {
  error: '',
  isLoading: false,
  list: [],
};

export const conversationSlice = createSlice({
  extraReducers: {
    // Add Conversation Data Message
    [`${addConversationDataMessage.type}`]: (
      state,
      action: { payload: Objects.Message },
    ) => {
      if (state.data) {
        return {
          ...state,
          data: {
            ...state.data,
            messages: [action.payload, ...(state.data?.messages || [])],
          },
        };
      }
    },

    // Add Conversation List Message
    [`${addConversationListMessage.type}`]: (
      state,
      action: { payload: Objects.Message },
    ) => {
      const conversdationIndex = state.list.filter(
        (conversation) => conversation.id === action.payload?.conversation?.id,
      );

      const {
        payload: {
          id,
          content,
          isSeen,
          createdAt,
          conversation,
          recipient,
          sender,
        },
      } = action;
      const newConversation: Objects.ConversationSummary = {
        id: conversation?.id as number,
        message: {
          content,
          createdAt,
          id,
          isSeen,
        },
        recipient: {
          firstName: recipient.firstName,
          id: recipient.id,
          lastName: recipient.lastName,
        },
        sender: {
          firstName: sender.firstName,
          id: sender.id,
          lastName: sender.lastName,
        },
      };

      if (conversdationIndex.length) {
        let oldConversations = [...state.list];
        oldConversations = oldConversations.filter(
          (conversationSummary) =>
            conversationSummary.id !== action.payload?.conversation?.id,
        );

        return {
          ...state,
          list: [newConversation, ...oldConversations],
        };
      } else {
        return {
          ...state,
          list: [newConversation, ...state.list],
        };
      }
    },

    // Get Conversation
    [`${getConversation.pending}`]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [`${getConversation.fulfilled}`]: (
      state,
      action: { payload: { data: Objects.Conversation } },
    ) => ({
      ...state,
      data: {
        ...state.data,
        ...action.payload.data,
      },
      isLoading: false,
    }),
    [`${getConversation.rejected}`]: (state) => ({
      ...state,
      isLoading: false,
    }),

    // Get Conversations
    [`${getConversations.pending}`]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [`${getConversations.fulfilled}`]: (
      state,
      action: { payload: { list: Objects.ConversationSummary[] } },
    ) => ({
      ...state,
      isLoading: false,
      list: action.payload.list,
    }),
    [`${getConversations.rejected}`]: (state) => ({
      ...state,
      isLoading: false,
    }),

    // Seen Conversation Messages
    [`${seenConversationMessages.pending}`]: (state) => ({
      ...state,
      error: '',
      isLoading: true,
    }),
    [`${seenConversationMessages.fulfilled}`]: (
      state,
      action: { payload: { id: number; messages: Objects.Message[] } },
    ) => ({
      ...state,
      ...(state.data && {
        data: {
          ...state.data,
          messages: action.payload.messages,
        },
      }),
      isLoading: false,
      list: state.list.map((conversation) => {
        if (conversation.id === action.payload.id) {
          const updatedMessage = action.payload.messages.find(
            (message) => conversation.message.id === message.id,
          );

          if (updatedMessage) {
            return {
              ...conversation,
              message: {
                ...conversation.message,
                isSeen: updatedMessage.isSeen,
              },
            };
          }

          return conversation;
        }

        return conversation;
      }),
    }),
    [`${seenConversationMessages.rejected}`]: (state) => ({
      ...state,
      isLoading: false,
    }),

    // Set Conversation Data
    [`${setConversationData.type}`]: (
      state,
      action: { payload: Objects.Conversation },
    ) => ({
      ...state,
      data: action.payload,
    }),
  },
  initialState,
  name: 'conversation',
  reducers: {},
});
