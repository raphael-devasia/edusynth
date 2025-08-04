import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface HostelState {
  hostels: any[];
  hostelRooms: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: HostelState = {
  hostels: [],
  hostelRooms: [],
  isLoading: false,
  error: null,
};

// Placeholder async thunks - to be implemented
export const fetchHostels = createAsyncThunk('hostel/fetchHostels', async () => []);
export const fetchHostelRooms = createAsyncThunk('hostel/fetchHostelRooms', async () => []);

const hostelSlice = createSlice({
  name: 'hostel',
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

export const { clearError } = hostelSlice.actions;
export default hostelSlice.reducer;
