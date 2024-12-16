import { UserType } from '../types';

export const getAccessToken = (): string | null => {
  return localStorage.getItem('DNat');
};

export const setAccessToken = (token: string) => {
  localStorage.setItem('DNat', token);
};

export const getUser = (): UserType | null => {
  const user = localStorage.getItem('DNuser');
  return user ? JSON.parse(user) : null;
};

export const setUser = (user: UserType): void => {
  localStorage.setItem('DNuser', JSON.stringify(user));
};
export const removeUser = (): void => {
  localStorage.removeItem('DNuser');
  localStorage.removeItem('DNat');
};
