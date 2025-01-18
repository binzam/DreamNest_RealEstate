import './Signup.css';
import RealEstateImageTwo from '../../../assets/images/realestate-image-2.jpg';
import { Link } from 'react-router-dom';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { GridLoader } from 'react-spinners';
import ErrorDisplay from '../../../components/ErrorDisplay';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';
const Signup = () => {
  const {
    formData,
    error,
    isLoading,
    handleChange,
    handleSubmit,
    googleLogin,
  } = useAuth(true);
  return (
    <div className="auth_page">
      <div className="auth_wrapper">
        <div className="auth_graphics">
          <Link className="backto_home_btn" to={'/'}>
            <IoArrowBackCircleSharp className="icon_back" />
            Back to website
          </Link>

          <img
            src={RealEstateImageTwo}
            className="slider_image"
            loading="lazy"
          />
        </div>
        <div className="form_wrapper">
          {isLoading && (
            <GridLoader
              color="#002955"
              margin={30}
              size={50}
              className="auth_loading"
            />
          )}
          <div className="form_hdr">
            <h2>Create an Account</h2>
            {error && <ErrorDisplay message={error} />}
            <span>
              Already have an Account?{' '}
              <Link className="form_hdr_link" to={'/login'}>
                Login in
              </Link>
            </span>
          </div>
          <form className="auth_form" onSubmit={handleSubmit}>
            <div className="form_row">
              <div className="form_input">
                <label>
                  <input
                    className="input_spc"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                  />
                </label>
              </div>
              <div className="form_input">
                <label>
                  <input
                    className="input_spc"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                  />
                </label>
              </div>
            </div>
            <div className="form_input">
              <label>
                <input
                  className="input_spc"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                />
              </label>
            </div>
            <div className="form_input">
              <label>
                <input
                  className="input_spc"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </label>
            </div>
            <div className="form_input">
              <label>
                <input
                  className="input_spc"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
              </label>
            </div>
            <div className="form_input chkbox">
              <label className="checkbox_label">
                <input
                  className="checkbox_input"
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                I agree to the
                <span className="txt_underline"> terms and conditions</span>
              </label>
            </div>
            <button type="submit" className="signup_btn_ca">
              Create Account
            </button>
            <button
              type="button"
              className="google_login_btn"
              onClick={() => googleLogin()}
            >
              <FcGoogle />
              Sign up with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
