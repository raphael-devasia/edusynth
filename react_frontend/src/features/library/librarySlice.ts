import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Book, BookIssue } from '../../types';
import apiService from '../../services/api';

interface LibraryState {
  books: Book[];
  bookIssues: BookIssue[];
  currentBook: Book | null;
  currentBookIssue: BookIssue | null;
  isLoading: boolean;
  error: string | null;
  totalBooks: number;
  totalIssues: number;
}

const initialState: LibraryState = {
  books: [],
  bookIssues: [],
  currentBook: null,
  currentBookIssue: null,
  isLoading: false,
  error: null,
  totalBooks: 0,
  totalIssues: 0,
};

// Books Async thunks
export const fetchBooks = createAsyncThunk<any[], { search?: string; subject?: string; author?: string } | undefined>(
  'library/fetchBooks',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.getBooks(params);
      return Array.isArray(response) ? response : (response as any)?.data || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch books');
    }
  }
);

export const fetchBook = createAsyncThunk(
  'library/fetchBook',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiService.getBook(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch book');
    }
  }
);

export const createBook = createAsyncThunk(
  'library/createBook',
  async (bookData: Partial<Book>, { rejectWithValue }) => {
    try {
      const response = await apiService.createBook(bookData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create book');
    }
  }
);

export const updateBook = createAsyncThunk(
  'library/updateBook',
  async ({ id, data }: { id: string; data: Partial<Book> }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateBook(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update book');
    }
  }
);

export const deleteBook = createAsyncThunk(
  'library/deleteBook',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiService.deleteBook(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete book');
    }
  }
);

// Book Issues Async thunks
export const fetchBookIssues = createAsyncThunk<any[], { member_id?: string; book_id?: string; is_returned?: boolean } | undefined>(
  'library/fetchBookIssues',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.getBookIssues(params);
      return Array.isArray(response) ? response : (response as any)?.data || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch book issues');
    }
  }
);

export const createBookIssue = createAsyncThunk(
  'library/createBookIssue',
  async (issueData: Partial<BookIssue>, { rejectWithValue }) => {
    try {
      const response = await apiService.createBookIssue(issueData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to issue book');
    }
  }
);

export const updateBookIssue = createAsyncThunk(
  'library/updateBookIssue',
  async ({ id, data }: { id: string; data: Partial<BookIssue> }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateBookIssue(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update book issue');
    }
  }
);

export const returnBook = createAsyncThunk(
  'library/returnBook',
  async ({ id, returnDate }: { id: string; returnDate: string }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateBookIssue(id, {
        return_date: returnDate,
        is_returned: true,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to return book');
    }
  }
);

// Library slice
const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentBook: (state, action: PayloadAction<Book | null>) => {
      state.currentBook = action.payload;
    },
    setCurrentBookIssue: (state, action: PayloadAction<BookIssue | null>) => {
      state.currentBookIssue = action.payload;
    },
    clearLibrary: (state) => {
      state.books = [];
      state.bookIssues = [];
      state.currentBook = null;
      state.currentBookIssue = null;
      state.totalBooks = 0;
      state.totalIssues = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Books
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as any;
        state.books = payload.data || payload;
        state.totalBooks = payload.pagination?.total || state.books.length;
        state.error = null;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBook = action.payload as Book;
        state.error = null;
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books.unshift(action.payload as any);
        state.totalBooks += 1;
        state.error = null;
      })
      .addCase(createBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const payload = action.payload as any;
        const index = state.books.findIndex(book => book._id === payload._id);
        if (index !== -1) {
          state.books[index] = payload;
        }
        const bookPayload = action.payload as Book;
        if (state.currentBook && state.currentBook._id === bookPayload._id) {
          state.currentBook = bookPayload;
        }
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter(book => book._id !== action.payload);
        state.totalBooks -= 1;
        if (state.currentBook && state.currentBook._id === action.payload) {
          state.currentBook = null;
        }
      })
      // Book Issues
      .addCase(fetchBookIssues.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBookIssues.fulfilled, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as any;
        state.bookIssues = payload.data || payload;
        state.totalIssues = payload.pagination?.total || state.bookIssues.length;
        state.error = null;
      })
      .addCase(fetchBookIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createBookIssue.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBookIssue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookIssues.unshift(action.payload as any);
        state.totalIssues += 1;
        state.error = null;
      })
      .addCase(createBookIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateBookIssue.fulfilled, (state, action) => {
        const payload = action.payload as BookIssue;
        const index = state.bookIssues.findIndex(issue => issue._id === payload._id);
        if (index !== -1) {
          state.bookIssues[index] = payload;
        }
        const bookIssuePayload = action.payload as BookIssue;
        if (state.currentBookIssue && state.currentBookIssue._id === bookIssuePayload._id) {
          state.currentBookIssue = bookIssuePayload;
        }
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        const payload = action.payload as BookIssue;
        const index = state.bookIssues.findIndex(issue => issue._id === payload._id);
        if (index !== -1) {
          state.bookIssues[index] = payload;
        }
        const bookIssuePayload = action.payload as BookIssue;
        if (state.currentBookIssue && state.currentBookIssue._id === bookIssuePayload._id) {
          state.currentBookIssue = bookIssuePayload;
        }
      });
  },
});

export const { clearError, setCurrentBook, setCurrentBookIssue, clearLibrary } = librarySlice.actions;
export default librarySlice.reducer;
