import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PropertyDataType } from '../../types/propertyTypes';
import axios from 'axios';
import { axiosInstance } from '../../api/axiosInstance';
import { getAccessToken } from '../../utils/authUtils';

interface UserState {
  wishlist: PropertyDataType[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  wishlist: [],
  loading: false,
  error: null,
};

export const addToWishlistThunk = createAsyncThunk(
  'user/addToWishlist',
  async (propertyId: string, { rejectWithValue }) => {
    const token = getAccessToken();
    try {
      const response = await axiosInstance.post(
        '/user/add-to-wishlist',
        { propertyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('ADD TO WISH API', response);

      return response.data.wishlist;
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to add to wishlist'
        );
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const removeFromWishlistThunk = createAsyncThunk(
  'user/removeFromWishlist',
  async (propertyId: string, { rejectWithValue }) => {
    const token = getAccessToken();

    try {
      const response = await axiosInstance.post(
        '/user/remove-from-wishlist',
        { propertyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Remove api', response);

      return response.data.wishlist;
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to remove from wishlist'
        );
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const fetchWishlistThunk = createAsyncThunk(
  'user/fetchWishlist',
  async (_, { rejectWithValue }) => {
    const token = getAccessToken();
    try {
      const response = await axiosInstance.get('/user/wishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('WISHLIST ALL', response);

      return response.data.wishlist;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to fetch wishlist'
        );
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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
      });
  },
});

export default userSlice.reducer;
