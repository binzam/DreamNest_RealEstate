import { Link, useLocation } from 'react-router-dom';
import './Login.css';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { GridLoader } from 'react-spinners';
import ErrorDisplay from '../../../components/ErrorDisplay';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';
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
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="login_btn" type="submit" disabled={isLoading}>
            Login
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
    </div>
  );
};

export default Login;
