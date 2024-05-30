import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import AxiosBaseUrl from '../../config/axios-configuration';

import ENDPOINTS from '../../utils/constants';

const axios = AxiosBaseUrl();

const initialState = {
  usersData: [],
  selectedUser: {},
  total: 0,
  loading: false,
  message: '',
  errMessage: null,
  success: false,
  errorOnInput: {
    name: {
      helperText: '',
      error: ''
    },
    email: {
      helperText: '',
      error: ''
    },
    password: {
      helperText: '',
      error: ''
    }
  }
};

export const AddUser = createAsyncThunk(
  `${ENDPOINTS.USER.INDEX}${ENDPOINTS.USER.ADD_USER}`,
  async (data, {
    rejectWithValue
  }) => {
    try {
      const response = await axios.post(`${ENDPOINTS.USER.INDEX}`, data);

      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data,
          status: err.response.status
        });
      }
      return rejectWithValue({
        err: {
          error: 'Network Error'
        }
      });
    }
  }
);

export const DeleteUser = createAsyncThunk(
  `${ENDPOINTS.USER.INDEX}${ENDPOINTS.USER.DELETE_USER}`,
  async (data, {
    rejectWithValue
  }) => {
    try {
      const response = await axios.delete(`${ENDPOINTS.USER.INDEX}/${data.userId}`);

      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data,
          status: err.response.status
        });
      }
      return rejectWithValue({
        err: {
          error: 'Network Error'
        }
      });
    }
  }
);

export const EditUser = createAsyncThunk(
  `${ENDPOINTS.USER.INDEX}${ENDPOINTS.USER.UPDATE_USER}`,
  async (data, {
    rejectWithValue
  }) => {
    try {
      const response = await axios.put(`${ENDPOINTS.USER.INDEX}/${data.userId}`, data);

      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data,
          status: err.response.status
        });
      }
      return rejectWithValue({
        err: {
          error: 'Network Error'
        }
      });
    }
  }
);

export const GetUser = createAsyncThunk(
  `${ENDPOINTS.USER.INDEX}${ENDPOINTS.USER.GET_USER}`,
  async (data, {
    rejectWithValue
  }) => {
    try {
      const response = await axios.get(`${ENDPOINTS.USER.INDEX}/${data.userId}`);

      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data,
          status: err.response.status
        });
      }
      return rejectWithValue({
        err: {
          error: 'Network Error'
        }
      });
    }
  }
);

export const GetUsers = createAsyncThunk(
  `${ENDPOINTS.USER.INDEX}${ENDPOINTS.USER.GET_USERS}`,
  async (data, {
    rejectWithValue
  }) => {
    try {
      const response = await axios.get(`${ENDPOINTS.USER.INDEX}${ENDPOINTS.USER.DEFAULT}`, {
        params: data
      });

      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data,
          status: err.response.status
        });
      }
      return rejectWithValue({
        err: {
          error: 'Network Error'
        }
      });
    }
  }
);

const users = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    SetUsersState(state, { payload: { field, value } }) {
      state[field] = value;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddUser.pending, (state) => ({
        ...state,
        loading: true,
        success: false
      }))
      .addCase(AddUser.fulfilled, (state, action) => ({
        ...state,
        message: action.payload.message,
        success: action.payload.success,
        loading: false
      }))
      .addCase(AddUser.rejected, (state, action) => ({
        ...state,
        errMessage: action.payload.err?.error,
        success: false,
        loading: false
      }));
    builder
      .addCase(DeleteUser.pending, (state) => ({
        ...state,
        loading: true,
        success: false
      }))
      .addCase(DeleteUser.fulfilled, (state, action) => ({
        ...state,
        message: action.payload.message,
        success: action.payload.success,
        loading: false
      }))
      .addCase(DeleteUser.rejected, (state, action) => ({
        ...state,
        errMessage: action.payload.err?.error,
        success: false,
        loading: false
      }));
    builder
      .addCase(EditUser.pending, (state) => ({
        ...state,
        loading: true,
        success: false
      }))
      .addCase(EditUser.fulfilled, (state, action) => ({
        ...state,
        message: action.payload.message,
        success: action.payload.success,
        loading: false
      }))
      .addCase(EditUser.rejected, (state, action) => ({
        ...state,
        errMessage: action.payload.err?.error,
        success: false,
        loading: false
      }));
    builder
      .addCase(GetUser.pending, (state) => ({
        ...state,
        loading: true,
        success: false
      }))
      .addCase(GetUser.fulfilled, (state, action) => ({
        ...state,
        selectedUser: action.payload.user,
        loading: false
      }))
      .addCase(GetUser.rejected, (state, action) => ({
        ...state,
        errMessage: action.payload.err?.error,
        success: false,
        loading: false
      }));
    builder
      .addCase(GetUsers.pending, (state) => ({
        ...state,
        loading: true,
        success: false
      }))
      .addCase(GetUsers.fulfilled, (state, action) => ({
        ...state,
        usersData: action.payload.users,
        total: action.payload.total,
        loading: false
      }))
      .addCase(GetUsers.rejected, (state, action) => ({
        ...state,
        errMessage: action.payload.err?.error,
        success: false,
        loading: false
      }));
  }
});

export const { SetUsersState } = users.actions;

export default users.reducer;
