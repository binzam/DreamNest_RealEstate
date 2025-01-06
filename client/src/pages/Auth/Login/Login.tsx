import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/slices/userSlice';
import { setAccessToken, setUser } from '../../../utils/authUtils';
import { AxiosError } from 'axios';
import { axiosPublic } from '../../../api/axiosInstance';
import { fetchWishlistThunk } from '../../../store/slices/wishlistThunks';
import { AppDispatch } from '../../../store/store';
import { GridLoader } from 'react-spinners';
import { fetchNotificationsThunk } from '../../../store/slices/notificationThunks';
import ErrorDisplay from '../../../components/ErrorDisplay';
const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const successMessage = state?.successMessage;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setError('Both fields are required!');
      return;
    }
    try {
      setIsLoading(true);
      setError(null);

      const response = await axiosPublic.post(
        '/auth/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log('login', response);

      const { accessToken, user } = response.data;
      if (accessToken && user) {
        dispatch(login({ user, accessToken }));
        dispatch(fetchWishlistThunk());
        dispatch(fetchNotificationsThunk());
        setAccessToken(accessToken);
        setUser(user);
        if (user.role === 'admin') {
          navigate('/admin/dashboard', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      }
    } catch (error: unknown) {
      console.log(error);

      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || 'An error occurred.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="auth_page_login">
      {successMessage && (
        <div className="success_message">{successMessage}</div>
      )}
      {!successMessage && (
        <Link className="backto_home_btn" to={'/'}>
          <IoArrowBackCircleSharp className="icon_back" />
          Back to website
        </Link>
      )}
      <div className="login_form">
        {isLoading && (
          <GridLoader
            color="#333"
            margin={30}
            size={50}
            className="auth_loading"
          />
        )}
        <h2>Welcome back!</h2>
        {error && <ErrorDisplay message={error} />}
        <form onSubmit={handleSubmit}>
          <div className="form_group">
            <label htmlFor="email">Email</label>
            <input
              className="login_input"
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form_group">
            <label htmlFor="password">Password</label>
            <input
              className="login_input"
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <button className="login_btn" type="submit" disabled={isLoading}>
            Login
          </button>
          <span className="form_option">
            Don't have an Account?{' '}
            <Link className="login_to_signup_link" to={'/signup'}>
              Sign up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
