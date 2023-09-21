/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars */

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestMessage } from '../../../Types/RequestMessage';
import { getMessages } from './api';

export type MessagesTypes = RequestMessage;

type Messages = {
  messages: MessagesTypes[],
  messagesLoader: boolean,
  messagesError: boolean | string
};

const initialState: Messages = {
  messages: [],
  messagesLoader: false,
  messagesError: false,
};

export const init = createAsyncThunk('messages/fetch', (userId: number) => {
  return getMessages(userId);
});

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    add: (state: Messages, action: PayloadAction<MessagesTypes>) => {
      state.messages = [...state.messages, action.payload];
    },
    take: (state: Messages, action: PayloadAction<MessagesTypes>) => {
      state.messages = [...state.messages].filter((message) => {
        return message.id !== action.payload.id;
      });
    },
    clear: (state: Messages) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state: Messages) => {
      state.messagesLoader = true;
    });
    builder.addCase(init.rejected, (state: Messages) => {
      state.messagesError = 'An error occurred while attempting to load data from the server. An internal server error may be caused by technical glitches or issues within the system. Our experts have already been notified of this problem and are actively working to resolve it.We apologize for any inconvenience caused. Please try to load the data again later.If the issue persists, please contact our support team for further assistance.Thank you for your understanding.';

      state.messagesLoader = false;
    });
    builder.addCase(init.fulfilled, (state: Messages, action: PayloadAction<any>) => {
      state.messages = action.payload;
      state.messagesLoader = false;
    });
  },
});

export const { add, take, clear } = messagesSlice.actions;
export default messagesSlice.reducer;
