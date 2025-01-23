import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import propertyReducer from './slices/propertySlice';
import wishlistReducer from './slices/wishlistSlice';
export const store = configureStore({
  reducer: {
    properties: propertyReducer,
    user: userReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
