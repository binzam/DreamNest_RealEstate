import { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import RealEstateImageTwo from '../../../assets/images/realestate-image-2.jpg';
// import SignUpIcon from '../../../assets/images/workspace-with-computer.png';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { axiosInstance } from '../../../api/axiosInstance';
const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const navigate = useNavigate();
  // const [error, setError] = useState('');
  // const [loading, setLoading] = useState('');
  // const { firstName, lastName, email, password, confirmPassword } = formData;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      agreeToTerms,
    } = formData;
    if (!agreeToTerms) {
      alert('You must agree to the terms and conditions');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        { firstName, lastName, email, password }
      );
      console.log(response);
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Server error. Please try again later.');
    }
  };
  console.log(formData);

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
          <div className="form_hdr">
            <h2>Create an Account</h2>
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
            <button type="submit">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
