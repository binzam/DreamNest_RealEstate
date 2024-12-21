import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPublic } from '../../api/axiosInstance';
import { PropertyDataType } from '../../types/propertyTypes';

interface PropertyState {
  properties: PropertyDataType[];
  propertiesById: { [key: string]: PropertyDataType };
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
  propertiesById: {},
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
      console.log('PROPERTY BY ID API CALL');

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
        state.propertiesById = action.payload.reduce(
          (
            acc: { [key: string]: PropertyDataType },
            property: PropertyDataType
          ) => {
            acc[property._id] = property;
            return acc;
          },
          {}
        );
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.propertiesById[action.payload.id] = action.payload;
      });
  },
});

export default propertySlice.reducer;
