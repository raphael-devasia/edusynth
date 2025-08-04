import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Staff } from '../../types';
import apiService from '../../services/api';

interface StaffState {
  staff: Staff[];
  currentStaff: Staff | null;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

const initialState: StaffState = {
  staff: [],
  currentStaff: null,
  isLoading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
};

// Async thunks
export const fetchStaff = createAsyncThunk<any[], { page?: number; limit?: number; search?: string; department?: string; designation?: string } | undefined>(
  'staff/fetchStaff',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.getStaff(params);
      return Array.isArray(response) ? response : (response as any)?.data || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch staff');
    }
  }
);

export const fetchStaffMember = createAsyncThunk(
  'staff/fetchStaffMember',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiService.getStaffMember(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch staff member');
    }
  }
);

export const createStaffMember = createAsyncThunk(
  'staff/createStaffMember',
  async (staffData: Partial<Staff>, { rejectWithValue }) => {
    try {
      const response = await apiService.createStaffMember(staffData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create staff member');
    }
  }
);

export const updateStaffMember = createAsyncThunk(
  'staff/updateStaffMember',
  async ({ id, data }: { id: string; data: Partial<Staff> }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateStaffMember(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update staff member');
    }
  }
);

export const deleteStaffMember = createAsyncThunk(
  'staff/deleteStaffMember',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiService.deleteStaffMember(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete staff member');
    }
  }
);

// Staff slice
const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentStaff: (state, action: PayloadAction<Staff | null>) => {
      state.currentStaff = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    clearStaff: (state) => {
      state.staff = [];
      state.currentStaff = null;
      state.totalCount = 0;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch staff
      .addCase(fetchStaff.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as any;
        state.staff = payload.data || payload;
        state.totalCount = payload.pagination?.total || state.staff.length;
        state.error = null;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch single staff member
      .addCase(fetchStaffMember.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStaffMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentStaff = action.payload as Staff;
        state.error = null;
      })
      .addCase(fetchStaffMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create staff member
      .addCase(createStaffMember.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createStaffMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.staff.unshift(action.payload as Staff);
        state.totalCount += 1;
        state.error = null;
      })
      .addCase(createStaffMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update staff member
      .addCase(updateStaffMember.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateStaffMember.fulfilled, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as any;
        const index = state.staff.findIndex(staff => staff._id === payload._id);
        if (index !== -1) {
          state.staff[index] = payload;
        }
        if (state.currentStaff && state.currentStaff._id === payload._id) {
          state.currentStaff = payload;
        }
        state.error = null;
      })
      .addCase(updateStaffMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete staff member
      .addCase(deleteStaffMember.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteStaffMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.staff = state.staff.filter(member => member._id !== action.payload);
        state.totalCount -= 1;
        if (state.currentStaff && state.currentStaff._id === action.payload) {
          state.currentStaff = null;
        }
        state.error = null;
      })
      .addCase(deleteStaffMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentStaff, setPage, setPageSize, clearStaff } = staffSlice.actions;
export default staffSlice.reducer;
