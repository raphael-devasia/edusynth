import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Item, ItemCategory, ItemStore, ItemSupplier } from '../../types';
import apiService from '../../services/api';

interface InventoryState {
  items: Item[];
  itemCategories: ItemCategory[];
  itemStores: ItemStore[];
  itemSuppliers: ItemSupplier[];
  currentItem: Item | null;
  currentCategory: ItemCategory | null;
  currentStore: ItemStore | null;
  currentSupplier: ItemSupplier | null;
  isLoading: boolean;
  error: string | null;
  totalItems: number;
}

const initialState: InventoryState = {
  items: [],
  itemCategories: [],
  itemStores: [],
  itemSuppliers: [],
  currentItem: null,
  currentCategory: null,
  currentStore: null,
  currentSupplier: null,
  isLoading: false,
  error: null,
  totalItems: 0,
};

// Items Async thunks
export const fetchItems = createAsyncThunk<any[], { search?: string; category?: string; store?: string } | undefined>(
  'inventory/fetchItems',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.getItems(params);
      return Array.isArray(response) ? response : (response as any)?.data || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch items');
    }
  }
);

export const fetchItem = createAsyncThunk<any, string>(
  'inventory/fetchItem',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.getItem(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch item');
    }
  }
);

export const createItem = createAsyncThunk<any, any>(
  'inventory/createItem',
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await apiService.createItem(itemData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create item');
    }
  }
);

export const updateItem = createAsyncThunk<any, { id: string; data: any }>(
  'inventory/updateItem',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateItem(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update item');
    }
  }
);

export const deleteItem = createAsyncThunk<string, string>(
  'inventory/deleteItem',
  async (id, { rejectWithValue }) => {
    try {
      await apiService.deleteItem(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete item');
    }
  }
);

// Inventory slice
const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentItem: (state, action: PayloadAction<Item | null>) => {
      state.currentItem = action.payload;
    },
    setCurrentCategory: (state, action: PayloadAction<ItemCategory | null>) => {
      state.currentCategory = action.payload;
    },
    setCurrentStore: (state, action: PayloadAction<ItemStore | null>) => {
      state.currentStore = action.payload;
    },
    setCurrentSupplier: (state, action: PayloadAction<ItemSupplier | null>) => {
      state.currentSupplier = action.payload;
    },
    clearInventory: (state) => {
      state.items = [];
      state.itemCategories = [];
      state.itemStores = [];
      state.itemSuppliers = [];
      state.currentItem = null;
      state.currentCategory = null;
      state.currentStore = null;
      state.currentSupplier = null;
      state.totalItems = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Items
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as any;
        state.items = payload.data || payload;
        state.totalItems = state.items.length;
        state.error = null;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItem.fulfilled, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as any;
        state.currentItem = payload;
        state.error = null;
      })
      .addCase(fetchItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as any;
        state.items.unshift(payload);
        state.totalItems += 1;
        state.error = null;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const payload = action.payload as any;
        const index = state.items.findIndex(item => item._id === payload._id);
        if (index !== -1) {
          state.items[index] = payload;
        }
        if (state.currentItem && state.currentItem._id === payload._id) {
          state.currentItem = payload;
        }
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
        state.totalItems -= 1;
        if (state.currentItem && state.currentItem._id === action.payload) {
          state.currentItem = null;
        }
      });
  },
});

export const { 
  clearError, 
  setCurrentItem, 
  setCurrentCategory, 
  setCurrentStore, 
  setCurrentSupplier, 
  clearInventory 
} = inventorySlice.actions;
export default inventorySlice.reducer;
