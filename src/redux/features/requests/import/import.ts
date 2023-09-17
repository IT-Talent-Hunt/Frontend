/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars */

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Request } from '../../../../Types/Request';
import { getImportRequests, requestStatusHandler } from './api';

type importRequestsType = {
  importRequests: Request[],
  importError: boolean | string,
  importLoader: boolean,
};

const initialState: importRequestsType = {
  importRequests: [],
  importError: false,
  importLoader: false,
};

export const init = createAsyncThunk('requests/import', (userId: number) => {
  return getImportRequests(userId);
});

export const statusChange = createAsyncThunk('request/status-handle',
  async (data: {requestId: number, status: string}) => {
    const response: any = await requestStatusHandler(data.requestId, data.status);

    return response.data;
  });

export const importRequestsSlice = createSlice({
  name: 'importRequests',
  initialState,
  reducers: {
    add: (state: importRequestsType, action: PayloadAction<Request>) => {
      state.importRequests = [...state.importRequests, action.payload];
    },
    take: (state: importRequestsType, action: PayloadAction<Request>) => {
      state.importRequests = [...state.importRequests].filter((request: Request) => {
        return request.id !== action.payload.id;
      });
    },
    clear: (state: importRequestsType) => {
      state.importRequests = [];
    },
    change: (
      state: importRequestsType,
      action: PayloadAction<any>,
    ) => {
      const { requestId, status } = action.payload;

      state.importRequests = [...state.importRequests].map((el) => {
        if (el.id === requestId) {
          el.status = status;
        }

        return el;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state: importRequestsType) => {
      state.importLoader = true;
    });
    builder.addCase(init.rejected, (state: importRequestsType) => {
      state.importError = '';

      state.importLoader = false;
    });
    builder.addCase(init.fulfilled,
      (state: importRequestsType, action: PayloadAction<any>) => {
        state.importRequests = action.payload;
        state.importLoader = false;
      });

    builder.addCase(statusChange.pending, (state: importRequestsType) => {
      state.importLoader = true;
    });
    builder.addCase(statusChange.rejected, (state: importRequestsType) => {
      state.importError = '';
      state.importLoader = false;
    });
    builder.addCase(statusChange.fulfilled,
      (state: importRequestsType, action: PayloadAction<any>) => {
        state.importRequests = action.payload;
      });
  },
});

export const {
  add,
  take,
  clear,
  change,
} = importRequestsSlice.actions;
export default importRequestsSlice.reducer;
