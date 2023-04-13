import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Socket } from 'socket.io-client';

import { Conversation, Message } from '@/services/index';

import { setAppError } from '../app/actions';
import { RootState } from '../store';
import { tokenSelector } from '../user/selectors';
import { ConversationActions } from './constants';
import { conversationDataSelector } from './selectors';

export const addConversationDataMessage = createAction<Objects.Message>(
  ConversationActions.ADD_CONVERSATION_DATA_MESSAGE,
);

export const addConversationListMessage = createAction<Objects.Message>(
  ConversationActions.ADD_CONVERSATION_LIST_MESSAGE,
);

export const setConversationData = createAction<Objects.Conversation | null>(
  ConversationActions.SET_CONVERSATION_DATA,
);

export const sendMessage = createAsyncThunk(
  ConversationActions.SEND_MESSAGE,
  async (
    params: {
      socket: Socket;
      conversationId?: number;
      recipientId?: number;
      content: string;
    },
    thunkAPI,
  ) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const conversationData = conversationDataSelector(state);
      const token = tokenSelector(state);
      const { socket, ...rest } = params;

      const createMessageRes = await Message.createMessage({ token, ...rest });
      const message = createMessageRes.data;

      if (!conversationData) {
        // set conversation with new message
        thunkAPI.dispatch(
          setConversationData({
            createdAt: message?.conversation?.createdAt || '1',
            id: message?.conversation?.id || 0,
            messages: [message],
            updatedAt: message?.conversation?.updatedAt || '1',
          }),
        );
      } else {
        // add the message in conversation data
        thunkAPI.dispatch(addConversationDataMessage(message));
      }

      // add the message in the list
      thunkAPI.dispatch(addConversationListMessage(message));

      socket.emit('createMessage', message);
      socket.emit('directMessage', message);

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response) {
          const axiosError = error?.response as Objects.ServiceError;
          if (axiosError?.status && axiosError.status === 400) {
            return thunkAPI.rejectWithValue(axiosError.data.message);
          }
        }
      }

      // set global error
      thunkAPI.dispatch(setAppError('Server is busy. Please try again later.'));

      return Promise.reject();
    }
  },
);

export const getConversation = createAsyncThunk(
  ConversationActions.GET_CONVERSATION_DATA,
  async (
    params: { conversationId?: number; recipientId?: number },
    thunkAPI,
  ) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);

      const getConversationRes = await Conversation.getConversation({
        token,
        ...params,
      });
      const conversation: Objects.Conversation = getConversationRes.data;

      return Promise.resolve({ data: conversation });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response) {
          const axiosError = error?.response as Objects.ServiceError;
          if (axiosError?.status && axiosError.status === 400) {
            return thunkAPI.rejectWithValue(axiosError.data.message);
          }
        }
      }

      // set global error
      thunkAPI.dispatch(setAppError('Server is busy. Please try again later.'));

      return Promise.reject();
    }
  },
);

export const getConversations = createAsyncThunk(
  ConversationActions.GET_CONVERSATION_LIST,
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);

      const getConversationsRes = await Conversation.getConversations({
        token,
      });
      const conversations: Objects.ConversationSummary[] =
        getConversationsRes.data;

      return Promise.resolve({ list: conversations });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response) {
          const axiosError = error?.response as Objects.ServiceError;
          if (axiosError?.status && axiosError.status === 400) {
            return thunkAPI.rejectWithValue(axiosError.data.message);
          }
        }
      }

      // set global error
      thunkAPI.dispatch(setAppError('Server is busy. Please try again later.'));

      return Promise.reject();
    }
  },
);

export const seenConversationMessages = createAsyncThunk(
  ConversationActions.SEEN_CONVERSATION_MESSAGES,
  async (params: { conversationId: number }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);

      const seenConversationMessagesRes =
        await Conversation.seenConversationMessages({
          conversationId: params.conversationId,
          token,
        });
      const updateConversationMessages: Objects.Conversation =
        seenConversationMessagesRes.data;

      return Promise.resolve({
        id: params.conversationId,
        messages: updateConversationMessages.messages,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response) {
          const axiosError = error?.response as Objects.ServiceError;
          if (axiosError?.status && axiosError.status === 400) {
            return thunkAPI.rejectWithValue(axiosError.data.message);
          }
        }
      }

      // set global error
      thunkAPI.dispatch(setAppError('Server is busy. Please try again later.'));

      return Promise.reject();
    }
  },
);
