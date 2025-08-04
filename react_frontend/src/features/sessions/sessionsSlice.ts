import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Session } from '../../types';
import apiService from '../../services/api';

interface SessionsState {
  sessions: Session[];
  currentSession: Session | null;
  activeSession: Session | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SessionsState = {
  sessions: [],
  currentSession: null,
  activeSession: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchSessions = createAsyncThunk<any[], any | undefined>(
  'sessions/fetchSessions',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.getSessions(params);
      return Array.isArray(response) ? response : (response as any)?.data || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch sessions');
    }
  }
);

export const fetchSession = createAsyncThunk(
  'sessions/fetchSession',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiService.getSession(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch session');
    }
  }
);

export const createSession = createAsyncThunk(
  'sessions/createSession',
  async (sessionData: Partial<Session>, { rejectWithValue }) => {
    try {
      const response = await apiService.createSession(sessionData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create session');
    }
  }
);

export const updateSession = createAsyncThunk(
  'sessions/updateSession',
  async ({ id, data }: { id: string; data: Partial<Session> }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateSession(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update session');
    }
  }
);

export const deleteSession = createAsyncThunk(
  'sessions/deleteSession',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiService.deleteSession(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete session');
    }
  }
);

// Sessions slice
const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentSession: (state, action: PayloadAction<Session | null>) => {
      state.currentSession = action.payload;
    },
    setActiveSession: (state, action: PayloadAction<Session | null>) => {
      state.activeSession = action.payload;
    },
    clearSessions: (state) => {
      state.sessions = [];
      state.currentSession = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch sessions
      .addCase(fetchSessions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as Session[];
        state.sessions = payload;
        const activeSession = state.sessions.find(session => session.is_active);
        if (activeSession) {
          state.activeSession = activeSession;
        }
        state.error = null;
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch single session
      .addCase(fetchSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentSession = action.payload as Session;
        state.error = null;
      })
      .addCase(fetchSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create session
      .addCase(createSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sessions.unshift(action.payload as any);
        // If this is the only session or it's marked as active, set it as active
        const sessionPayload = action.payload as Session;
        if ((sessionPayload as any).is_active || state.sessions.length === 1) {
          state.activeSession = sessionPayload;
        }
        state.error = null;
      })
      .addCase(createSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update session
      .addCase(updateSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSession.fulfilled, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as Session;
        const index = state.sessions.findIndex(session => session._id === payload._id);
        if (index !== -1) {
          state.sessions[index] = payload;
        }
        if (state.currentSession && state.currentSession._id === payload._id) {
          state.currentSession = payload;
        }
        // Update active session if this session is now active
        if (payload.is_active) {
          state.activeSession = payload;
        }
        state.error = null;
      })
      .addCase(updateSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete session
      .addCase(deleteSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sessions = state.sessions.filter(session => session._id !== action.payload);
        if (state.currentSession && state.currentSession._id === action.payload) {
          state.currentSession = null;
        }
        if (state.activeSession && state.activeSession._id === action.payload) {
          state.activeSession = null;
        }
        state.error = null;
      })
      .addCase(deleteSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentSession, setActiveSession, clearSessions } = sessionsSlice.actions;
export default sessionsSlice.reducer;
