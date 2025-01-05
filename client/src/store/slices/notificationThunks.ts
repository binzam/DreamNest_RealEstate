import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../api/axiosInstance';
import { RootState } from '../store';
import axios from 'axios';
export const fetchNotificationsThunk = createAsyncThunk(
  'user/fetchNotification',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;

    if (!state.user.isAuthenticated) {
      return rejectWithValue(
        'You need to be logged in to view your Notification'
      );
    }

    try {
      const response = await axiosPrivate.get('/user/notifications');
      console.log('Notification API CALL: FETCH', response);

      return response.data.notifications;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to fetch Notification'
        );
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
export const markNotificationAsReadThunk = createAsyncThunk(
  'user/markNotificationAsRead',
  async (notificationId: string, { rejectWithValue, getState }) => {
    const state = getState() as RootState;

    if (!state.user.isAuthenticated) {
      return rejectWithValue(
        'You need to be logged in to view your Notification'
      );
    }

    try {
      const response = await axiosPrivate.patch(
        `/user/notifications/${notificationId}/read`
      );
      console.log('MARK AS READNotification API CALL: FETCH', response);

      return response.data.notification;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to mark Notification as read'
        );
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
