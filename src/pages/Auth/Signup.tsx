import { useEffect, useState } from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';
import RealEstateImageOne from '../../assets/images/realestate-image-1.jpg';
import RealEstateImageTwo from '../../assets/images/realestate-image-2.jpg';
import RealEstateImageThree from '../../assets/images/realestate-image-3.jpg';
import RealEstateImageFour from '../../assets/images/realestate-image-4.jpg';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const images = [
    RealEstateImageOne,
    RealEstateImageTwo,
    RealEstateImageThree,
    RealEstateImageFour,
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  // Preload images
  useEffect(() => {
    let loadedImages = 0;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedImages += 1;
        if (loadedImages === images.length) {
          setAllImagesLoaded(true);
        }
      };
    });
  }, [images]);

  useEffect(() => {
    if (!allImagesLoaded) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, allImagesLoaded]);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      agreeToTerms,
    } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreeToTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }

    setError('');
    console.log('Form submitted successfully:', formData);
  };
  return (
    <div className="auth_page">
      <div className="auth_wrapper">
        <div className="auth_graphics">
          <Link className="backto_home_btn" to={'/'}>
            <IoArrowBackCircleSharp className="icon_back" />
            Back to website
          </Link>
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="slider_image"
            style={{ transition: 'opacity 1s ease-in-out' }}
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

            {error && <p style={{ color: 'red' }}>{error}</p>}
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
