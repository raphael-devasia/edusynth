import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AdmissionsState {
  applications: any[];
  admissionSettings: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: AdmissionsState = {
  applications: [],
  admissionSettings: null,
  isLoading: false,
  error: null,
};

// Placeholder async thunks - to be implemented
// Async thunks for admissions CRUD

export const fetchApplications = createAsyncThunk('admissions/fetchApplications', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/admissions');
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message || 'Failed to fetch applications');
  }
});

export const fetchAdmissionSettings = createAsyncThunk('admissions/fetchAdmissionSettings', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/admissions/settings');
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message || 'Failed to fetch settings');
  }
});

export const createApplication = createAsyncThunk('admissions/createApplication', async (data: any, { rejectWithValue }) => {
  try {
    const res = await axios.post('/api/admissions', data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message || 'Failed to create application');
  }
});

export const updateApplication = createAsyncThunk('admissions/updateApplication', async ({ id, data }: { id: string, data: any }, { rejectWithValue }) => {
  try {
    const res = await axios.put(`/api/admissions/${id}`, data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message || 'Failed to update application');
  }
});

export const deleteApplication = createAsyncThunk('admissions/deleteApplication', async (id: string, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/admissions/${id}`);
    return id;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message || 'Failed to delete application');
  }
});

const admissionsSlice = createSlice({
  name: 'admissions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch applications
      .addCase(fetchApplications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create application
      .addCase(createApplication.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications.push(action.payload);
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update application
      .addCase(updateApplication.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as any;
        const idx = state.applications.findIndex((a: any) => a._id === payload._id);
        if (idx !== -1) state.applications[idx] = action.payload;
      })
      .addCase(updateApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete application
      .addCase(deleteApplication.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications = state.applications.filter((a: any) => a._id !== action.payload);
      })
      .addCase(deleteApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch admission settings
      .addCase(fetchAdmissionSettings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdmissionSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admissionSettings = action.payload;
      })
      .addCase(fetchAdmissionSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = admissionsSlice.actions;
export default admissionsSlice.reducer;
