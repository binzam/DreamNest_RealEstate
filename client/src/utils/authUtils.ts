import { axiosPublic } from '../api/axiosInstance';
import { UserDataType } from '../types/userTypes';

export const getAccessToken = (): string | null => {
  const token = localStorage.getItem('DNat');
  return token ? token : null;
};

export const setAccessToken = (token: string) => {
  localStorage.setItem('DNat', token);
};

export const getUser = (): UserDataType | null => {
  const user = localStorage.getItem('DNuser');
  return user ? JSON.parse(user) : null;
};

export const setUser = (user: UserDataType): void => {
  localStorage.setItem('DNuser', JSON.stringify(user));
};
export const removeUser = (): void => {
  localStorage.removeItem('DNuser');
  localStorage.removeItem('DNat');
};
export const logoutUser = async () => {
  try {
    await axiosPublic.post('/auth/logout', {}, { withCredentials: true });
  } catch (error) {
    console.error('Failed to logout:', error);
  }
};
