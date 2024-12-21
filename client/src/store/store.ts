import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import propertyReducer from './slices/propertySlice';
export const store = configureStore({
  reducer: {
    properties: propertyReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
