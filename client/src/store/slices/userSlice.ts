import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PropertyDataType } from '../../types/propertyTypes';
import { getAccessToken, getUser } from '../../utils/authUtils';
import {
  addToWishlistThunk,
  fetchWishlistThunk,
  removeFromWishlistThunk,
} from './wishlistThunks';
import { NotificationType } from '../../types/interface';
import {
  fetchNotificationsThunk,
  markNotificationAsReadThunk,
} from './notificationThunks';

interface User {
  email: string;
  _id: string;
  role: string;
  profilePicture?: string;
  firstName: string;
}

interface UserState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  wishlist: PropertyDataType[];
  notifications: NotificationType[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  wishlist: [],
  notifications: [],
  loading: false,
  error: null,
};
const savedUser = getUser();
const savedToken = getAccessToken();
if (savedUser && savedToken) {
  initialState.isAuthenticated = true;
  initialState.user = savedUser;
  initialState.accessToken = savedToken;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User; accessToken: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.wishlist = [];
      state.notifications = [];
      state.loading = false;
      state.error = null;
    },
    setLoading(state) {
      state.loading = true;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    updateProfilePicture(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.profilePicture = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToWishlistThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(addToWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeFromWishlistThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(removeFromWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchNotificationsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotificationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(markNotificationAsReadThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markNotificationAsReadThunk.fulfilled, (state, action) => {
        const updatedNotification = action.payload;
        const index = state.notifications.findIndex(
          (n) => n._id === updatedNotification._id
        );
        if (index !== -1) {
          state.notifications[index] = {
            ...state.notifications[index],
            ...updatedNotification,
          };
        }
        state.loading = false;
      })
      .addCase(markNotificationAsReadThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { login, logout, setLoading, setError, updateProfilePicture } =
  userSlice.actions;
export default userSlice.reducer;
