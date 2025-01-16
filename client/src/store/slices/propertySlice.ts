import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPublic } from '../../api/axiosInstance';
import { PropertyDataType } from '../../types/propertyTypes';

interface PropertyState {
  properties: PropertyDataType[];
  singleProperty: PropertyDataType | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
  singleProperty: null,
  loading: true,
  error: null,
};

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.get(`/properties/list`);
      console.log('PROPERTIES API CALL', response);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to fetch properties'
        );
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
export const fetchPropertyById = createAsyncThunk(
  'properties/fetchPropertyById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.get(`/properties/list/${id}`);
      console.log('PROPERTY BY ID API CALL', response);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to fetch property'
        );
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProperty = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default propertySlice.reducer;
