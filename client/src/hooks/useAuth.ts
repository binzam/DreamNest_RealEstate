import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/userSlice';
import { setAccessToken, setUser } from '../utils/authUtils';
import { axiosPublic } from '../api/axiosInstance';
import { AppDispatch } from '../store/store';
import { fetchWishlistThunk } from '../store/slices/wishlistThunks';
import { fetchNotificationsThunk } from '../store/slices/notificationThunks';
import { AxiosError } from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

interface AuthData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  confirmPassword?: string;
  agreeToTerms?: boolean;
}

const useAuth = (isSignup: boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AuthData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      email,
      password,
      firstName,
      lastName,
      confirmPassword,
      agreeToTerms,
    } = formData;

    if (
      !email ||
      !password ||
      (isSignup && (!firstName || !lastName || !confirmPassword))
    ) {
      setError('Please fill out all required fields.');
      return;
    }
    if (isSignup && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (isSignup && !agreeToTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const endpoint = isSignup ? '/auth/register' : '/auth/login';
      const userData = isSignup
        ? { firstName, lastName, email, password }
        : { email, password };
      const response = await axiosPublic.post(endpoint, userData, {
        withCredentials: true,
      });
      if (isSignup && response.status === 201) {
        navigate('/login', {
          state: {
            successMessage: 'Account created successfully! Please log in.',
          },
        });
        return;
      }
      const { accessToken, user } = response.data;
      if (accessToken && user) {
        dispatch(login({ user, accessToken }));
        dispatch(fetchWishlistThunk());
        dispatch(fetchNotificationsThunk());
        setAccessToken(accessToken);
        setUser(user);
        navigate(user.role === 'admin' ? '/admin/dashboard' : '/', {
          replace: true,
        });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || 'An error occurred.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axiosPublic.post(
          `/auth/google`,
          { code },
          { withCredentials: true }
        );
        const { accessToken, user } = response.data;
        if (accessToken && user) {
          dispatch(login({ user, accessToken }));
          dispatch(fetchWishlistThunk());
          dispatch(fetchNotificationsThunk());
          setAccessToken(accessToken);
          setUser(user);
          navigate(user.role === 'admin' ? '/admin/dashboard' : '/', {
            replace: true,
          });
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || 'An error occurred.');
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    },
    flow: 'auth-code',
  });

  return {
    formData,
    error,
    isLoading,
    handleChange,
    handleSubmit,
    googleLogin,
  };
};

export default useAuth;
