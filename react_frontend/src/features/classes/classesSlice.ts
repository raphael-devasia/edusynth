import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Class } from '../../types';
import apiService from '../../services/api';

interface ClassesState {
  classes: Class[];
  currentClass: Class | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ClassesState = {
  classes: [],
  currentClass: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchClasses = createAsyncThunk<Class[], { search?: string; session_id?: string } | undefined>(
  'classes/fetchClasses',
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.getClasses(params);
      // Handle both array and object responses
      return Array.isArray(response) ? response : (response as any)?.data || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch classes');
    }
  }
);

export const fetchClass = createAsyncThunk<Class, string>(
  'classes/fetchClass',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.getClass(id);
      return response as Class;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch class');
    }
  }
);

export const createClass = createAsyncThunk<Class, any>(
  'classes/createClass',
  async (classData, { rejectWithValue }) => {
    try {
      const response = await apiService.createClass(classData);
      return response as Class;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create class');
    }
  }
);

export const updateClass = createAsyncThunk<Class, { id: string; data: any }>(
  'classes/updateClass',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateClass(id, data);
      return response as Class;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update class');
    }
  }
);

export const deleteClass = createAsyncThunk<string, string>(
  'classes/deleteClass',
  async (id, { rejectWithValue }) => {
    try {
      await apiService.deleteClass(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete class');
    }
  }
);

// Classes slice
const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentClass: (state, action: PayloadAction<Class | null>) => {
      state.currentClass = action.payload;
    },
    clearClasses: (state) => {
      state.classes = [];
      state.currentClass = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch classes
      .addCase(fetchClasses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as any;
        state.classes = payload.data || payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch single class
      .addCase(fetchClass.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentClass = action.payload as Class;
        state.error = null;
      })
      .addCase(fetchClass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create class
      .addCase(createClass.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classes.unshift(action.payload as any);
        state.error = null;
      })
      .addCase(createClass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update class
      .addCase(updateClass.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as Class;
        const index = state.classes.findIndex(cls => cls._id === payload._id);
        if (index !== -1) {
          state.classes[index] = payload;
        }
        state.currentClass = payload;
        state.error = null;
      })
      .addCase(updateClass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete class
      .addCase(deleteClass.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classes = state.classes.filter(cls => cls._id !== action.payload);
        if (state.currentClass && state.currentClass._id === action.payload) {
          state.currentClass = null;
        }
        state.error = null;
      })
      .addCase(deleteClass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentClass, clearClasses } = classesSlice.actions;
export default classesSlice.reducer;
