import { Link, useLocation } from 'react-router-dom';
import './Login.css';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { GridLoader } from 'react-spinners';
import ErrorDisplay from '../../../components/ErrorDisplay/ErrorDisplay';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';
import Container from '../../../components/Container/Container';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
const Login = () => {
  const { state } = useLocation();
  const successMessage = state?.successMessage;
  const {
    formData,
    error,
    isLoading,
    handleChange,
    handleSubmit,
    googleLogin,
  } = useAuth(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      <Container>
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
            <div className="login_form_group">
              <input
                className="login_input"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="login_form_group login">
              <input
                className="login_input"
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="password_toggle_icon"
                onClick={togglePasswordVisibility}
              >
                {' '}
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button className="login_btn" type="submit" disabled={isLoading}>
              Sign in
            </button>

            <button
              type="button"
              className="google_login_btn"
              onClick={() => googleLogin()}
            >
              <FcGoogle />
              Sign in with Google
            </button>
            <span className="form_option">
              Don't have an Account?{' '}
              <Link className="login_to_signup_link" to={'/signup'}>
                Sign up
              </Link>
            </span>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
