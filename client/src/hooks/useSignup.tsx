import  { useState } from 'react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axios';

export const useSignup = () => {
  const { connect } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post(
        `/auth/register`,
        {
          formData,
        },
        { withCredentials: true }
      );
      // console.log(response);
      const accessToken = response?.data?.accessToken;
      const user = response?.data?.user;
      if (accessToken && user) {
        connect(accessToken, user);
        navigate('/', { replace: true });
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
