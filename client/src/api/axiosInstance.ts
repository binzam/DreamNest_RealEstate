import axios from 'axios';
import { getAccessToken, removeUser, setAccessToken } from '../utils/authUtils';

export const axiosPublic = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const axiosPrivate = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
const refreshAccessToken = async () => {
  try {
    const response = await axiosPublic.get('/auth/refresh-token', {
      withCredentials: true,
    });

    const newAccessToken = response.data.accessToken;
    setAccessToken(newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    removeUser();
    window.location.href = '/login';
    throw error;
  }
};
axiosPrivate.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }
    if (originalRequest.url.includes('/auth/refresh-token')) {
      return Promise.reject(error);
    }
    if (
      (!error.response || error.response.status >= 500) &&
      originalRequest._retryCount < 3
    ) {
      originalRequest._retryCount += 1;
      console.log(
        `Retrying request to ${originalRequest.url}... Attempt ${originalRequest._retryCount}`
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        return axiosPrivate(originalRequest);
      } catch (retryError) {
        console.error(
          `Retrying request failed after ${originalRequest._retryCount} attempts`,
          retryError
        );
        return Promise.reject(retryError);
      }
    }
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        console.error('Refresh failed:', refreshError);
        removeUser();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
