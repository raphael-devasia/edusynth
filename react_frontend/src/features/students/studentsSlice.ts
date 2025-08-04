import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Student } from '../../types';
import apiService from '../../services/api';

interface StudentsState {
  students: Student[];
  currentStudent: Student | null;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

const initialState: StudentsState = {
  students: [],
  currentStudent: null,
  isLoading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
};

// Async thunks
export const fetchStudents = createAsyncThunk<any[], { page?: number; limit?: number; search?: string; class_id?: string; section_id?: string } | undefined>(
  'students/fetchStudents',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.getStudents(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch students');
    }
  }
);

export const fetchStudent = createAsyncThunk(
  'students/fetchStudent',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiService.getStudent(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch student');
    }
  }
);

export const createStudent = createAsyncThunk(
  'students/createStudent',
  async (studentData: Partial<Student>, { rejectWithValue }) => {
    try {
      const response = await apiService.createStudent(studentData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create student');
    }
  }
);

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ({ id, data }: { id: string; data: Partial<Student> }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateStudent(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update student');
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiService.deleteStudent(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete student');
    }
  }
);

// Students slice
const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentStudent: (state, action: PayloadAction<Student | null>) => {
      state.currentStudent = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    clearStudents: (state) => {
      state.students = [];
      state.currentStudent = null;
      state.totalCount = 0;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch students
      .addCase(fetchStudents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as any;
        state.students = payload.data || payload;
        state.totalCount = payload.pagination?.total || payload.length;
        state.error = null;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch single student
      .addCase(fetchStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentStudent = action.payload;
        state.error = null;
      })
      .addCase(fetchStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create student
      .addCase(createStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students.unshift(action.payload as any);
        state.totalCount += 1;
        state.error = null;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update student
      .addCase(updateStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as any;
        const index = state.students.findIndex(student => student._id === payload._id);
        if (index !== -1) {
          state.students[index] = payload;
        }
        if (state.currentStudent && state.currentStudent._id === payload._id) {
          state.currentStudent = payload;
        }
        state.error = null;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete student
      .addCase(deleteStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = state.students.filter(student => student._id !== action.payload);
        state.totalCount -= 1;
        if (state.currentStudent && state.currentStudent._id === action.payload) {
          state.currentStudent = null;
        }
        state.error = null;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentStudent, setPage, setPageSize, clearStudents } = studentsSlice.actions;
export default studentsSlice.reducer;
