/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars */

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProjectCardProps } from '../../../Types/ProjectCardProps';
import {
  getProjects,
  addProject,
  editProject,
  applyToProject,
} from './api';

type ProjectsType = {
  projects: ProjectCardProps[],
  pages: number,
  length: number,
  loading: boolean,
  error: string | boolean,
};

const initialState: ProjectsType = {
  projects: [],
  pages: 0,
  length: 0,
  loading: false,
  error: false,
};

export const init = createAsyncThunk('projects/fetch', (link: string) => {
  return getProjects(link);
});

export const push = createAsyncThunk('project/push', (newProject: ProjectCardProps | any) => {
  return addProject(newProject);
});

export const edit = createAsyncThunk('project/edit',
  async (data: { projectId: number, teamId: number, newData: ProjectCardProps | any}) => {
    const response: any = await editProject(data.projectId, data.teamId, data.newData);

    return response.data;
  });

export const apply = createAsyncThunk('project/apply', (data: any) => {
  return applyToProject(data);
});

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    add: (state: ProjectsType, action: PayloadAction<ProjectCardProps | any>) => {
      state.projects = [...state.projects, action.payload];
    },
    take: (state: ProjectsType, action: PayloadAction<ProjectCardProps>) => {
      state.projects = state.projects
        .filter((project) => project.description !== action.payload.description);
    },
    clear: (state: ProjectsType) => {
      state.projects = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state: ProjectsType) => {
      state.loading = true;
    });
    builder.addCase(init.rejected, (state: ProjectsType) => {
      state.loading = false;
      state.error = `
      An error occurred while attempting to load data from the server. An internal server error may be caused by technical glitches or issues within the system. Our experts have already been notified of this problem and are actively working to resolve it.We apologize for any inconvenience caused. Please try to load the data again later.If the issue persists, please contact our support team for further assistance.Thank you for your understanding.
      `;
    });
    builder.addCase(init.fulfilled,
      (state: ProjectsType, action: any) => {
        state.projects = action.payload.projectResponseDtos;
        state.pages = action.payload.totalPage;
        state.length = action.payload.totalElements;
        state.loading = false;
        state.error = false;
      });

    builder.addCase(push.pending, (state: ProjectsType) => {
      state.loading = true;
    });
    builder.addCase(push.rejected, (state: ProjectsType) => {
      state.loading = false;
      state.error = `
        An error occurred while attempting to load data from the server. An internal server error may be caused by technical glitches or issues within the system. Our experts have already been notified of this problem and are actively working to resolve it.We apologize for any inconvenience caused. Please try to load the data again later.If the issue persists, please contact our support team for further assistance.Thank you for your understanding.
      `;
    });
    builder.addCase(push.fulfilled,
      (state: ProjectsType, actions: any) => {
        state.projects = [...state.projects, actions.payload];
        state.loading = false;
        state.error = false;
      });

    builder.addCase(edit.pending, (state: ProjectsType) => {
      state.loading = true;
    });

    builder.addCase(edit.rejected, (state: ProjectsType) => {
      state.loading = false;
      state.error = `
        An error occurred while attempting to load data from the server. An internal server error may be caused by technical glitches or issues within the system. Our experts have already been notified of this problem and are actively working to resolve it.We apologize for any inconvenience caused. Please try to load the data again later.If the issue persists, please contact our support team for further assistance.Thank you for your understanding.
        `;
    });

    builder.addCase(edit.fulfilled,
      (state: ProjectsType) => {
        state.loading = false;
        state.error = false;
      });
  },
});

export const { add, take, clear } = projectsSlice.actions;
export default projectsSlice.reducer;
