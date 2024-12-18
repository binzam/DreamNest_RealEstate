import axios from 'axios';
import { getAccessToken, setAccessToken } from '../utils/authUtils';

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/auth/refresh-token`,
          { withCredentials: true }
        );
        const newAccessToken = data.accessToken;
        // console.log('REFRESH TOKEN API', data);

        setAccessToken(newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        console.error('Refresh token failed', error);
        // window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);
