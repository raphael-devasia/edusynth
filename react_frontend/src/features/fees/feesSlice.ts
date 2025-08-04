import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FeeCategory, FeeType, FeeGroup } from '../../types';
import apiService from '../../services/api';

interface FeesState {
  feeCategories: FeeCategory[];
  feeTypes: FeeType[];
  feeGroups: FeeGroup[];
  currentFeeCategory: FeeCategory | null;
  currentFeeType: FeeType | null;
  currentFeeGroup: FeeGroup | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: FeesState = {
  feeCategories: [],
  feeTypes: [],
  feeGroups: [],
  currentFeeCategory: null,
  currentFeeType: null,
  currentFeeGroup: null,
  isLoading: false,
  error: null,
};

// Fee Categories Async thunks
export const fetchFeeCategories = createAsyncThunk<any[], any | undefined>(
  'fees/fetchFeeCategories',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.getFeeCategories(params);
      return Array.isArray(response) ? response : (response as any)?.data || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch fee categories');
    }
  }
);

export const createFeeCategory = createAsyncThunk<any, Partial<FeeCategory>>(
  'fees/createFeeCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await apiService.createFeeCategory(categoryData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create fee category');
    }
  }
);

export const updateFeeCategory = createAsyncThunk<any, { id: string; data: Partial<FeeCategory> }>(
  'fees/updateFeeCategory',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateFeeCategory(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update fee category');
    }
  }
);

export const deleteFeeCategory = createAsyncThunk<string, string>(
  'fees/deleteFeeCategory',
  async (id, { rejectWithValue }) => {
    try {
      await apiService.deleteFeeCategory(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete fee category');
    }
  }
);

// Fee Types Async thunks
export const fetchFeeTypes = createAsyncThunk<any[], any | undefined>(
  'fees/fetchFeeTypes',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.getFeeTypes(params);
      return Array.isArray(response) ? response : (response as any)?.data || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch fee types');
    }
  }
);

export const createFeeType = createAsyncThunk<any, Partial<FeeType>>(
  'fees/createFeeType',
  async (typeData, { rejectWithValue }) => {
    try {
      const response = await apiService.createFeeType(typeData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create fee type');
    }
  }
);

export const updateFeeType = createAsyncThunk<any, { id: string; data: Partial<FeeType> }>(
  'fees/updateFeeType',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateFeeType(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update fee type');
    }
  }
);

export const deleteFeeType = createAsyncThunk<string, string>(
  'fees/deleteFeeType',
  async (id, { rejectWithValue }) => {
    try {
      await apiService.deleteFeeType(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete fee type');
    }
  }
);

// Fee Groups Async thunks
export const fetchFeeGroups = createAsyncThunk<any[], any | undefined>(
  'fees/fetchFeeGroups',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.getFeeGroups(params);
      return Array.isArray(response) ? response : (response as any)?.data || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch fee groups');
    }
  }
);

export const createFeeGroup = createAsyncThunk<any, Partial<FeeGroup>>(
  'fees/createFeeGroup',
  async (groupData, { rejectWithValue }) => {
    try {
      const response = await apiService.createFeeGroup(groupData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create fee group');
    }
  }
);

export const updateFeeGroup = createAsyncThunk<any, { id: string; data: Partial<FeeGroup> }>(
  'fees/updateFeeGroup',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateFeeGroup(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update fee group');
    }
  }
);

export const deleteFeeGroup = createAsyncThunk<string, string>(
  'fees/deleteFeeGroup',
  async (id, { rejectWithValue }) => {
    try {
      await apiService.deleteFeeGroup(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete fee group');
    }
  }
);

// Fees slice
const feesSlice = createSlice({
  name: 'fees',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentFeeCategory: (state, action: PayloadAction<FeeCategory | null>) => {
      state.currentFeeCategory = action.payload;
    },
    setCurrentFeeType: (state, action: PayloadAction<FeeType | null>) => {
      state.currentFeeType = action.payload;
    },
    setCurrentFeeGroup: (state, action: PayloadAction<FeeGroup | null>) => {
      state.currentFeeGroup = action.payload;
    },
    clearFees: (state) => {
      state.feeCategories = [];
      state.feeTypes = [];
      state.feeGroups = [];
      state.currentFeeCategory = null;
      state.currentFeeType = null;
      state.currentFeeGroup = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fee Categories
      .addCase(fetchFeeCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeCategories = action.payload;
        state.error = null;
      })
      .addCase(fetchFeeCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createFeeCategory.fulfilled, (state, action) => {
        state.feeCategories.unshift(action.payload as any);
      })
      .addCase(updateFeeCategory.fulfilled, (state, action) => {
        const index = state.feeCategories.findIndex(cat => cat._id === (action.payload as any)._id);
        if (index !== -1) {
          state.feeCategories[index] = action.payload as any;
        }
      })
      .addCase(deleteFeeCategory.fulfilled, (state, action) => {
        state.feeCategories = state.feeCategories.filter(cat => cat._id !== action.payload);
      })
      // Fee Types
      .addCase(fetchFeeTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeTypes = action.payload;
        state.error = null;
      })
      .addCase(fetchFeeTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createFeeType.fulfilled, (state, action) => {
        state.feeTypes.unshift(action.payload as any);
      })
      .addCase(updateFeeType.fulfilled, (state, action) => {
        const index = state.feeTypes.findIndex(type => type._id === (action.payload as any)._id);
        if (index !== -1) {
          state.feeTypes[index] = action.payload as any;
        }
      })
      .addCase(deleteFeeType.fulfilled, (state, action) => {
        state.feeTypes = state.feeTypes.filter(type => type._id !== action.payload);
      })
      // Fee Groups
      .addCase(fetchFeeGroups.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeGroups = action.payload;
        state.error = null;
      })
      .addCase(fetchFeeGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createFeeGroup.fulfilled, (state, action) => {
        state.feeGroups.unshift(action.payload as any);
      })
      .addCase(updateFeeGroup.fulfilled, (state, action) => {
        const index = state.feeGroups.findIndex(group => group._id === (action.payload as any)._id);
        if (index !== -1) {
          state.feeGroups[index] = action.payload as any;
        }
      })
      .addCase(deleteFeeGroup.fulfilled, (state, action) => {
        state.feeGroups = state.feeGroups.filter(group => group._id !== action.payload);
      });
  },
});

export const { 
  clearError, 
  setCurrentFeeCategory, 
  setCurrentFeeType, 
  setCurrentFeeGroup, 
  clearFees 
} = feesSlice.actions;
export default feesSlice.reducer;
