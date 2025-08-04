import { configureStore, createSlice } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import studentsReducer from '../features/students/studentsSlice';
import classesReducer from '../features/classes/classesSlice';
import sectionsReducer from '../features/sections/sectionsSlice';
import sessionsReducer from '../features/sessions/sessionsSlice';
import feesReducer from '../features/fees/feesSlice';
import admissionsSlice from '../features/admissions/admissionsSlice';

// Create placeholder slices for modules that don't exist yet
const createPlaceholderSlice = (name: string) => {
  return createSlice({
    name,
    initialState: {
      items: [],
      loading: false,
      error: null,
    },
    reducers: {
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
      setItems: (state, action) => {
        state.items = action.payload;
      },
    },
  });
};

// Create placeholder reducers for missing slices
const librarySlice = createPlaceholderSlice('library');
const staffSlice = createPlaceholderSlice('staff');
const inventorySlice = createPlaceholderSlice('inventory');
const examsSlice = createPlaceholderSlice('exams');
const attendanceSlice = createPlaceholderSlice('attendance');
const transportSlice = createPlaceholderSlice('transport');
const hostelSlice = createPlaceholderSlice('hostel');
const payrollSlice = createPlaceholderSlice('payroll');
const reportsSlice = createPlaceholderSlice('reports');
const settingsSlice = createPlaceholderSlice('settings');
const notificationsSlice = createPlaceholderSlice('notifications');
const chatSlice = createPlaceholderSlice('chat');
const certificatesSlice = createPlaceholderSlice('certificates');
const homeworkSlice = createPlaceholderSlice('homework');
const timetableSlice = createPlaceholderSlice('timetable');
const subjectsSlice = createPlaceholderSlice('subjects');
const alumniSlice = createPlaceholderSlice('alumni');
const expensesSlice = createPlaceholderSlice('expenses');
const incomeSlice = createPlaceholderSlice('income');
const frontofficeSlice = createPlaceholderSlice('frontoffice');

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    classes: classesReducer,
    sections: sectionsReducer,
    sessions: sessionsReducer,
    fees: feesReducer,
    library: librarySlice.reducer,
    staff: staffSlice.reducer,
    inventory: inventorySlice.reducer,
    exams: examsSlice.reducer,
    attendance: attendanceSlice.reducer,
    transport: transportSlice.reducer,
    hostel: hostelSlice.reducer,
    payroll: payrollSlice.reducer,
    reports: reportsSlice.reducer,
    settings: settingsSlice.reducer,
    notifications: notificationsSlice.reducer,
    chat: chatSlice.reducer,
    certificates: certificatesSlice.reducer,
    homework: homeworkSlice.reducer,
    timetable: timetableSlice.reducer,
    subjects: subjectsSlice.reducer,
    admissions: admissionsSlice,
    alumni: alumniSlice.reducer,
    expenses: expensesSlice.reducer,
    income: incomeSlice.reducer,
    frontoffice: frontofficeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
