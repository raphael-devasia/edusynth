import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface IncomeState {
  income: any[];
  incomeHeads: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IncomeState = {
  income: [],
  incomeHeads: [],
  isLoading: false,
  error: null,
};

// Placeholder async thunks - to be implemented
export const fetchIncome = createAsyncThunk('income/fetchIncome', async () => []);
export const fetchIncomeHeads = createAsyncThunk('income/fetchIncomeHeads', async () => []);
export const createIncome = createAsyncThunk('income/createIncome', async (data: any) => data);

const incomeSlice = createSlice({
  name: 'income',
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

export const { clearError } = incomeSlice.actions;
export default incomeSlice.reducer;
