/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MessagesTypes, messagesSlice } from '../Messages/messages';

type Notifications = {
  notifications: MessagesTypes[],
};

const initialState: Notifications = {
  notifications: [],
};

export const notificationsSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    add: (state: Notifications, action: PayloadAction<MessagesTypes>) => {
      state.notifications = [...state.notifications, action.payload];
    },
    take: (state: Notifications, action: PayloadAction<MessagesTypes>) => {
      state.notifications = [...state.notifications].filter((notification) => {
        return notification.id !== action.payload.id;
      });
    },
    clear: (state: Notifications) => {
      state.notifications = [];
    },
  },
});

export const { add, take, clear } = notificationsSlice.actions;
export default notificationsSlice.reducer;
