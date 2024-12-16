import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { useState } from 'react';
import { axiosInstance } from '../../../api/axiosInstance';
import { useDispatch } from 'react-redux';
import { login, setLoading, setError } from '../../../store/slices/authSlice';
import { setAccessToken, setUser } from '../../../utils/authUtils';
import { AxiosError } from 'axios';
const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoadingState] = useState(false);
  const [error, setErrorState] = useState('');
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setErrorState('Both fields are required!');
      return;
    }
    try {
      setLoadingState(true);
      setErrorState('');
      dispatch(setLoading());
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      console.log('login', response);

      const { accessToken, user } = response.data;
      if (accessToken && user) {
        dispatch(login({ user, accessToken }));
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
        dispatch(
          setError(error.response?.data?.message || 'An error occurred.')
        );
      } else {
        dispatch(setError('An unexpected error occurred.'));
      }
    } finally {
      setLoadingState(false);
    }
  };
  return (
    <div className="auth_page_login">
      <Link className="backto_home_btn" to={'/'}>
        <IoArrowBackCircleSharp className="icon_back" />
        Back to website
      </Link>
      <div className="login_form">
        <h2>Welcome back!</h2>
        {error && <div className="error_message">{error}</div>}
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
          <button className="login_btn" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <span className="form_option">
            Don't have an Account?{' '}
            <Link className="form_hdr_link" to={'/signup'}>
              Sign up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
