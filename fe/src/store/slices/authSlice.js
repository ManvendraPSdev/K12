import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../services/apiClient';

// Helper to get safely stored initial state
const getInitialStoredAuth = () => {
  const token = localStorage.getItem('token');
  let admin = null;
  try {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      admin = JSON.parse(storedAdmin);
    }
  } catch (err) {
    console.error('Failed to parse stored admin object', err);
  }

  return {
    token: token || null,
    admin: admin || null,
    isAuthenticated: Boolean(token),
  };
};

const initialStored = getInitialStoredAuth();

export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { admin, token } = response.data.data;

      // Persist token and admin info in localStorage (passwords are NEVER stored)
      localStorage.setItem('token', token);
      localStorage.setItem('admin', JSON.stringify(admin));

      return { admin, token };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        (error.response?.status === 429
          ? 'Too many login attempts. Please wait a few minutes and try again.'
          : 'Login failed. Please check your credentials.');
      return rejectWithValue(message);
    }
  },
);

export const fetchCurrentAdmin = createAsyncThunk(
  'auth/fetchCurrentAdmin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/auth/me');
      const { admin } = response.data.data;
      localStorage.setItem('admin', JSON.stringify(admin));
      return { admin };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch admin profile');
    }
  },
);

export const logoutAdmin = createAsyncThunk(
  'auth/logoutAdmin',
  async (_, { dispatch }) => {
    try {
      // Notify backend if token exists
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Ignore network errors on logout since token is stateless
      console.warn('Backend logout response error (ignored):', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialStored.token,
    admin: initialStored.admin,
    isAuthenticated: initialStored.isAuthenticated,
    loading: false,
    error: null,
  },
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    logoutLocally(state) {
      state.token = null;
      state.admin = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.admin = action.payload.admin;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.admin = null;
        state.error = action.payload;
      })
      // Current Admin profile check
      .addCase(fetchCurrentAdmin.fulfilled, (state, action) => {
        state.admin = action.payload.admin;
      })
      .addCase(fetchCurrentAdmin.rejected, (state) => {
        // If profile fetch fails with invalid token, reset auth
        state.isAuthenticated = false;
        state.token = null;
        state.admin = null;
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
      })
      // Logout
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.token = null;
        state.admin = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { clearAuthError, logoutLocally } = authSlice.actions;
export default authSlice.reducer;
