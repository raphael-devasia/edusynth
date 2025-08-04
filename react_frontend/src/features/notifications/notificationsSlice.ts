import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface NotificationsState {
  notifications: any[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: NotificationsState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
};

// Placeholder async thunks - to be implemented
export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async () => []);
export const markAsRead = createAsyncThunk('notifications/markAsRead', async (id: string) => id);
export const markAllAsRead = createAsyncThunk('notifications/markAllAsRead', async () => []);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Placeholder implementations
  },
});

export const { clearError } = notificationsSlice.actions;
export default notificationsSlice.reducer;
