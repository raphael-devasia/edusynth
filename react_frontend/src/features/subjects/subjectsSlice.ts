import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface SubjectsState {
  subjects: any[];
  subjectGroups: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SubjectsState = {
  subjects: [],
  subjectGroups: [],
  isLoading: false,
  error: null,
};

// Placeholder async thunks - to be implemented
export const fetchSubjects = createAsyncThunk('subjects/fetchSubjects', async () => []);
export const fetchSubjectGroups = createAsyncThunk('subjects/fetchSubjectGroups', async () => []);
export const createSubject = createAsyncThunk('subjects/createSubject', async (data: any) => data);

const subjectsSlice = createSlice({
  name: 'subjects',
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

export const { clearError } = subjectsSlice.actions;
export default subjectsSlice.reducer;
