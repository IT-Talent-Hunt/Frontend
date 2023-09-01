/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars */

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProjectCardProps } from '../../../Types/ProjectCardProps';
import { addFavorite, getFavorites, removeFavorite } from './api';

type FavoritesTypes = {
  favorites: ProjectCardProps[],
  favoritesLoading: boolean,
  favoritesPages: number,
  favoritesError: boolean | string,
};

const initialState: FavoritesTypes = {
  favorites: [],
  favoritesLoading: false,
  favoritesPages: 0,
  favoritesError: false,
};

export const init = createAsyncThunk('favorites/fetch', (url: string) => {
  return getFavorites(url);
});

export const push = createAsyncThunk('favorites/add', (projectId: number) => {
  return addFavorite(projectId);
});

export const remove = createAsyncThunk('favorites/remove', (projectId: number) => {
  return removeFavorite(projectId);
});

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    add: (state: FavoritesTypes, action: PayloadAction<ProjectCardProps>) => {
      state.favorites = [...state.favorites, action.payload];
    },
    take: (state: FavoritesTypes, action: PayloadAction<ProjectCardProps>) => {
      state.favorites = state.favorites
        .filter((favorites) => favorites.description !== action.payload.description);
    },
    clear: (state: FavoritesTypes) => {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state: FavoritesTypes) => {
      state.favoritesLoading = true;
    });

    builder.addCase(init.rejected, (state: FavoritesTypes) => {
      state.favoritesError = `
        An error occurred while attempting to load data from the server. An internal server error may be caused by technical glitches or issues within the system. Our experts have already been notified of this problem and are actively working to resolve it.We apologize for any inconvenience caused. Please try to load the data again later.If the issue persists, please contact our support team for further assistance.Thank you for your understanding.
      `;
      state.favoritesLoading = false;
    });

    builder.addCase(init.fulfilled, (state: FavoritesTypes, action: PayloadAction<any>) => {
      state.favorites = action.payload.projectResponseDtos;
      state.favoritesPages = action.payload.totalPage;
      state.favoritesLoading = false;
    });
  },
});

export const { add, take, clear } = favoritesSlice.actions;
export default favoritesSlice.reducer;
