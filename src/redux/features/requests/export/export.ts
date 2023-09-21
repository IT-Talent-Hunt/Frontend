/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Request } from '../../../../Types/Request';
import { getExportRequests, sendRequest } from './api';

type exportRequestsType = {
  exportRequests: Request[],
  exportError: boolean,
  exportLoader: boolean,
};

const initialState: exportRequestsType = {
  exportRequests: [],
  exportError: false,
  exportLoader: false,
};

export const init = createAsyncThunk('requests/export', (userId: number) => {
  return getExportRequests(userId);
});

export const send = createAsyncThunk('requests/export/send', (body: any) => {
  const response = sendRequest(body);

  /* eslint-disable-next-line */
  console.log(response);

  return response;
});

export const exportRequestsSlice = createSlice({
  name: 'exportRequests',
  initialState,
  reducers: {
    add: (state: exportRequestsType, action: PayloadAction<Request>) => {
      state.exportRequests = [...state.exportRequests, action.payload];
    },
    take: (state: exportRequestsType, action: PayloadAction<Request>) => {
      state.exportRequests = [...state.exportRequests].filter((request: Request) => {
        return request.id !== action.payload.id;
      });
    },
    clear: (state: exportRequestsType) => {
      state.exportRequests = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state: exportRequestsType) => {
      state.exportLoader = true;
    });
    builder.addCase(init.rejected, (state: exportRequestsType) => {
      state.exportError = true;
      state.exportLoader = false;
    });
    builder.addCase(init.fulfilled,
      (state: exportRequestsType, action: PayloadAction<any>) => {
        state.exportRequests = action.payload;
        state.exportLoader = false;
        state.exportError = false;
      });

    builder.addCase(send.pending, (state: exportRequestsType) => {
      state.exportLoader = true;
    });

    builder.addCase(send.rejected, (state: exportRequestsType) => {
      state.exportError = true;
      state.exportLoader = false;
    });

    builder.addCase(send.fulfilled, (state: exportRequestsType) => {
      state.exportLoader = false;
      state.exportError = false;
    });
  },
});

export const { add, take, clear } = exportRequestsSlice.actions;
export default exportRequestsSlice.reducer;
