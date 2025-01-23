import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../api/axiosInstance';
import { PropertyDataType } from '../../types/propertyTypes';

interface WishlistState {
  wishlist: PropertyDataType[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  wishlist: [],
  loading: false,
  error: null,
};

// Async thunk to fetch wishlist
export const fetchWishlistThunk = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (userId?: string) => {
    const endpoint = userId
      ? `/admin/users/${userId}/wishlist` // Admin fetching another user's wishlist
      : '/user/wishlist'; // User fetching their own wishlist
    const response = await axiosPrivate.get(endpoint);
    return response.data;
  }
);

// Async thunk to add to wishlist
export const addToWishlistThunk = createAsyncThunk(
  'wishlist/addToWishlist',
  async (propertyId: string) => {
    const response = await axiosPrivate.post('/user/wishlist/add', {
      propertyId,
    });
    return response.data;
  }
);

// Async thunk to remove from wishlist
export const removeFromWishlistThunk = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (propertyId: string) => {
    const response = await axiosPrivate.delete(
      `/user/wishlist/remove/${propertyId}`
    );
    return response.data;
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlistThunk.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.loading = false;
      })
      .addCase(fetchWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch wishlist.';
      })
      .addCase(addToWishlistThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlistThunk.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.loading = false;
      })
      .addCase(addToWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add to wishlist.';
      })
      .addCase(removeFromWishlistThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlistThunk.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.loading = false;
      })
      .addCase(removeFromWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to remove from wishlist.';
      });
  },
});

export default wishlistSlice.reducer;
