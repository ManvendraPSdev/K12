import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService.js';

// Helper to safely load stored credentials
const getInitialStoredAuth = () => {
  if (typeof localStorage === 'undefined') {
    return { token: null, admin: null, isAuthenticated: false };
  }

  const token = localStorage.getItem('token');
  let admin = null;
  try {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      admin = JSON.parse(storedAdmin);
    }
  } catch (err) {
    console.error('Failed to parse stored admin object:', err);
    localStorage.removeItem('admin');
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
      const response = await authService.login({
        email: email.trim().toLowerCase(),
        password,
      });

      const { admin, token } = response.data;

      // Store JWT and public admin info in localStorage (never passwords)
      localStorage.setItem('token', token);
      localStorage.setItem('admin', JSON.stringify(admin));

      return { admin, token };
    } catch (error) {
      const status = error.response?.status;
      const data = error.response?.data;

      let message = 'Login failed. Please verify your credentials.';
      if (status === 401) {
        message = data?.message || 'Invalid email or password.';
      } else if (status === 429) {
        message = data?.message || 'Too many login attempts. Please wait a few minutes before trying again.';
      } else if (data?.message) {
        message = data.message;
      }

      return rejectWithValue(message);
    }
  },
);

export const fetchCurrentAdmin = createAsyncThunk(
  'auth/fetchCurrentAdmin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getMe();
      const { admin } = response.data;
      localStorage.setItem('admin', JSON.stringify(admin));
      return { admin };
    } catch (error) {
      // Clear invalid/expired session
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      const message = error.response?.data?.message || 'Session expired. Please log in again.';
      return rejectWithValue(message);
    }
  },
);

export const logoutAdmin = createAsyncThunk(
  'auth/logoutAdmin',
  async () => {
    try {
      // Backend stateless logout notification
      await authService.logout();
    } catch (error) {
      console.warn('Stateless backend logout call completed with notice:', error.message);
    } finally {
      // Ensure client storage is always cleared
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
    isCheckingAuth: Boolean(initialStored.token), // true if token needs verification on startup
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
      state.isCheckingAuth = false;
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
      // Current Admin verification
      .addCase(fetchCurrentAdmin.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(fetchCurrentAdmin.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.isAuthenticated = true;
        state.admin = action.payload.admin;
      })
      .addCase(fetchCurrentAdmin.rejected, (state) => {
        state.isCheckingAuth = false;
        state.isAuthenticated = false;
        state.token = null;
        state.admin = null;
      })
      // Logout (fulfilled or rejected)
      .addCase(logoutAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.token = null;
        state.admin = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.isCheckingAuth = false;
        state.error = null;
      })
      .addCase(logoutAdmin.rejected, (state) => {
        state.token = null;
        state.admin = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.isCheckingAuth = false;
        state.error = null;
      });
  },
});

export const { clearAuthError, logoutLocally } = authSlice.actions;
export default authSlice.reducer;
