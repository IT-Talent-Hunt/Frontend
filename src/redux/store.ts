import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import projectsReducer from './features/projects/projects';
import favoritesReducer from './features/favorites/favorites';
import exportRequestsReducer from './features/requests/export/export';
import importRequestsReducer from './features/requests/import/import';
import messagesReducer from './features/Messages/messages';
import notificationsReducer from './features/Notification/notification';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    favorites: favoritesReducer,
    exportRequests: exportRequestsReducer,
    importRequests: importRequestsReducer,
    messages: messagesReducer,
    notifications: notificationsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
