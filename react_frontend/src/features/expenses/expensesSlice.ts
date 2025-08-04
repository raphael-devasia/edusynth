import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ExpensesState {
  expenses: any[];
  expenseHeads: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ExpensesState = {
  expenses: [],
  expenseHeads: [],
  isLoading: false,
  error: null,
};

// Placeholder async thunks - to be implemented
export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async () => []);
export const fetchExpenseHeads = createAsyncThunk('expenses/fetchExpenseHeads', async () => []);
export const createExpense = createAsyncThunk('expenses/createExpense', async (data: any) => data);

const expensesSlice = createSlice({
  name: 'expenses',
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

export const { clearError } = expensesSlice.actions;
export default expensesSlice.reducer;
