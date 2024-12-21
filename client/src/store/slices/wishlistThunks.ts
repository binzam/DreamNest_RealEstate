import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../api/axiosInstance';
import { RootState } from '../store'; 
import axios from 'axios';

export const addToWishlistThunk = createAsyncThunk(
  'user/addToWishlist',
  async (propertyId: string, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    
    if (!state.user.isAuthenticated) {
      return rejectWithValue('You need to be logged in to add to wishlist');
    }

    try {
      const response = await axiosPrivate.post('/user/add-to-wishlist', { propertyId });
      console.log('WISHLIST API CALL: ADD', response);
      return response.data.wishlist;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to add to wishlist');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const removeFromWishlistThunk = createAsyncThunk(
  'user/removeFromWishlist',
  async (propertyId: string, { rejectWithValue, getState }) => {
    const state = getState() as RootState;

    if (!state.user.isAuthenticated) {
      return rejectWithValue('You need to be logged in to remove from wishlist');
    }

    try {
      const response = await axiosPrivate.post('/user/remove-from-wishlist', { propertyId });
      console.log('WISHLIST API CALL: REMOVE', response);
      return response.data.wishlist;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to remove from wishlist');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const fetchWishlistThunk = createAsyncThunk(
  'user/fetchWishlist',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;

    if (!state.user.isAuthenticated) {
      return rejectWithValue('You need to be logged in to view your wishlist');
    }

    try {
      const response = await axiosPrivate.get('/user/wishlist');
      console.log('WISHLIST API CALL: FETCH', response);

      return response.data.wishlist;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
