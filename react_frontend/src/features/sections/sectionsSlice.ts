import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Section } from '../../types';
import apiService from '../../services/api';

interface SectionsState {
  sections: Section[];
  currentSection: Section | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SectionsState = {
  sections: [],
  currentSection: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchSections = createAsyncThunk<any[], { class_id?: string } | undefined>(
  'sections/fetchSections',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.getSections(params);
      return Array.isArray(response) ? response : (response as any)?.data || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch sections');
    }
  }
);

export const fetchSection = createAsyncThunk(
  'sections/fetchSection',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiService.getSection(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch section');
    }
  }
);

export const createSection = createAsyncThunk(
  'sections/createSection',
  async (sectionData: Partial<Section>, { rejectWithValue }) => {
    try {
      const response = await apiService.createSection(sectionData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create section');
    }
  }
);

export const updateSection = createAsyncThunk(
  'sections/updateSection',
  async ({ id, data }: { id: string; data: Partial<Section> }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateSection(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update section');
    }
  }
);

export const deleteSection = createAsyncThunk(
  'sections/deleteSection',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiService.deleteSection(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete section');
    }
  }
);

// Sections slice
const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentSection: (state, action: PayloadAction<Section | null>) => {
      state.currentSection = action.payload;
    },
    clearSections: (state) => {
      state.sections = [];
      state.currentSection = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch sections
      .addCase(fetchSections.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as any;
        state.sections = payload.data || payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch single section
      .addCase(fetchSection.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentSection = action.payload as Section;
        state.error = null;
      })
      .addCase(fetchSection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create section
      .addCase(createSection.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sections.unshift(action.payload as any);
        state.error = null;
      })
      .addCase(createSection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update section
      .addCase(updateSection.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSection.fulfilled, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as Section;
        const index = state.sections.findIndex(section => section._id === payload._id);
        if (index !== -1) {
          state.sections[index] = payload;
        }

        state.currentSection = payload;
        state.error = null;
      })
      .addCase(updateSection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete section
      .addCase(deleteSection.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sections = state.sections.filter(section => section._id !== action.payload);
        if (state.currentSection && state.currentSection._id === action.payload) {
          state.currentSection = null;
        }
        state.error = null;
      })
      .addCase(deleteSection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentSection, clearSections } = sectionsSlice.actions;
export default sectionsSlice.reducer;
