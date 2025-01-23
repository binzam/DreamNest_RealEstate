import './UserProfile.css';
import {
  FaCheck,
  FaHeart,
  FaPenToSquare,
  FaPhone,
  FaUpload,
  FaUser,
} from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { axiosPrivate } from '../../api/axiosInstance';
import { MdCancel, MdEmail, MdSaveAlt } from 'react-icons/md';
import { FaEdit, FaHome } from 'react-icons/fa';
import ErrorDisplay from '../../components/ErrorDisplay';
import { GridLoader } from 'react-spinners';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateProfilePicture } from '../../store/slices/userSlice';
import { GrScheduleNew } from 'react-icons/gr';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import BackButton from '../../components/BackButton/BackButton';
interface UserProfileProps {
  isAdminView?: boolean;
}

const UserProfile = ({ isAdminView = false }: UserProfileProps) => {
  const dispatch = useDispatch();
  const { userId } = useParams<{ userId?: string }>();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profilePicture: '',
    wishlistCount: 0,
    propertyCount: 0,
    tourScheduleCount: 0,
  });
  const [editProfileMode, setEditProfileMode] = useState(false);
  const [editPhotoMode, setEditPhotoMode] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isImgloading, setIsImgLoading] = useState(false);
  const [isProfileloading, setIsprofileLoading] = useState(false);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const endpoint = userId ? `/admin/users/${userId}` : '/user/profile';
        const response = await axiosPrivate.get(endpoint);
        setUserData(response.data);
        console.log(response);

        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, [userId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setError(null);
      setSuccessMessage(null);
      setEditPhotoMode(true);
      setProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleImageUpload = async () => {
    if (!profilePicture) return;
    setIsImgLoading(true);
    const formData = new FormData();
    formData.append('profilePicture', profilePicture);

    try {
      const response = await axiosPrivate.post(
        '/user/profile/upload-picture',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Image uploaded successfully:', response);
      dispatch(updateProfilePicture(response.data.profilePicture));
      setUserData((prev) => ({
        ...prev,
        profilePicture: response.data.profilePicture,
      }));
      setEditPhotoMode(false);
      setPreviewImage(null);
      const savedUserData = JSON.parse(localStorage.getItem('DNuser') || '{}');

      const updatedUserData = {
        ...savedUserData,
        profilePicture: response.data.profilePicture,
      };

      localStorage.setItem('DNuser', JSON.stringify(updatedUserData));
      setSuccessMessage('Profile picture updated successfully!');
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      setEditPhotoMode(false);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data?.message) {
          if (error.response.data.message.startsWith('File too large')) {
            setError(
              'File size exceeds the allowed limit. Please try a smaller file.'
            );
          } else {
            setError(error.response.data.message);
          }
        } else {
          setError(
            'An error occurred while uploading the image. Please try again.'
          );
        }
      } else {
        setError(
          'An unexpected error occurred. Please check your network and try again.'
        );
      }
    } finally {
      setIsImgLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsprofileLoading(true);
    setError(null);
    try {
      const response = await axiosPrivate.put('/user/profile', {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
      });

      console.log('Profile updated successfully:', response.data);
      setUserData((prev) => ({
        ...prev,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber,
      }));
      setEditProfileMode(false);
      const savedUserData = JSON.parse(localStorage.getItem('DNuser') || '{}');

      const updatedUserData = {
        ...savedUserData,
        firstName:
          userData.firstName !== savedUserData.firstName
            ? userData.firstName
            : savedUserData.firstName,
        email:
          userData.email !== savedUserData.email
            ? userData.email
            : savedUserData.email,
        profilePicture:
          userData.profilePicture !== savedUserData.profilePicture
            ? userData.profilePicture
            : savedUserData.profilePicture,
      };

      localStorage.setItem('DNuser', JSON.stringify(updatedUserData));

      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch (error) {
      setError('An error occurred while saving the profile. Please try again.');
      console.error('Error saving profile:', error);
    } finally {
      setIsprofileLoading(false);
    }
  };

  return (
    <div className="usr_prfl_pge">
      <div className="prfl_hdr">
        <BackButton />
        <div className="prfl_hdr_main">
          {!isAdminView && <h2>Hello {userData.firstName || 'there'}!</h2>}

          <p>
            <MdEmail /> {userData.email}
          </p>
        </div>
        <div className="usr_prl_hdr_info">
          <IoMdInformationCircleOutline />
          {isAdminView ? (
            <p>This is {userData.firstName}'s profile.</p>
          ) : (
            <p>
              Here you can edit your personal information, change profile
              picture and keep track of your essesntials.
            </p>
          )}
        </div>
      </div>
      <div className="hdr_actions">
        <div className="usr_prf_acts">
          <Link to={'/wishlist'}>
            <FaHeart />
            Wishlist
          </Link>
          <span className="usr_prf_act_count">{userData.wishlistCount}</span>
        </div>
        <div className="usr_prf_acts">
          <Link
            to={
              isAdminView
                ? `/admin/users/${userId}/properties`
                : '/manage-properties'
            }
          >
            <FaHome />
            Properties
          </Link>
          <span className="usr_prf_act_count">{userData.propertyCount}</span>
        </div>
        <div className="usr_prf_acts">
          <Link
            to={
              isAdminView
                ? `/admin/users/${userId}/tour-schedules`
                : '/tour-schedules'
            }
          >
            <GrScheduleNew /> Tour Schedules
          </Link>
          <span className="usr_prf_act_count">
            {userData.tourScheduleCount}
          </span>
        </div>
      </div>
      {error && <ErrorDisplay message={error} />}
      {successMessage && (
        <div className="upload_success_msg">
          <FaCheck />
          {successMessage}
        </div>
      )}
      <div className="prfl_cntnt">
        <div className="prfl_cntn_top">
          {isImgloading && (
            <GridLoader
              color="#13ccbb"
              margin={10}
              size={25}
              className="upload_loading"
            />
          )}
          <div className="prfl_picture">
            {previewImage ? (
              <img src={previewImage} alt="Preview" />
            ) : userData.profilePicture !== '' ? (
              <img src={userData.profilePicture} alt="Profile" />
            ) : (
              <FaUser />
            )}
          </div>
          {!isAdminView && (
            <form
              className="upload_image_form"
              onSubmit={(e) => {
                e.preventDefault();
                handleImageUpload();
              }}
            >
              <input
                id="uploadImage"
                type="file"
                onChange={handleImageChange}
              />
              {editPhotoMode && (
                <button className="upload_image_btn" type="submit">
                  <FaUpload />
                  {isImgloading ? 'Uploading...' : 'Upload'}
                </button>
              )}
              {!editPhotoMode && !successMessage && (
                <label htmlFor="uploadImage" className="select_image_label">
                  <FaPenToSquare />
                  <span>Change photo</span>
                </label>
              )}
            </form>
          )}
        </div>
        <div className="prfl_cntn_btm">
          {isProfileloading && (
            <GridLoader
              color="#13ccbb"
              margin={10}
              size={55}
              className="upload_loading"
            />
          )}
          {!isAdminView && (
            <>
              {!editProfileMode && !isAdminView ? (
                <button
                  onClick={() => setEditProfileMode(true)}
                  className="edit_prfl_btn"
                >
                  <FaEdit /> Edit Profile
                </button>
              ) : (
                <button
                  onClick={() => setEditProfileMode(false)}
                  className="cancel_edit_btn"
                >
                  <MdCancel /> Cancel
                </button>
              )}
            </>
          )}
          <div className="key">
            <label htmlFor="firstName">
              <FaUser /> First Name
            </label>
            {editProfileMode && !isAdminView ? (
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
              />
            ) : (
              <span className="value">{userData.firstName}</span>
            )}
          </div>
          <div className="key">
            <label htmlFor="lastName">
              <FaUser /> Last Name
            </label>

            {editProfileMode && !isAdminView ? (
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
              />
            ) : (
              <span className="value">{userData.lastName}</span>
            )}
          </div>
          <div className="key">
            <label htmlFor="email">
              <MdEmail />
              Email
            </label>
            {editProfileMode && !isAdminView ? (
              <input
                id="email"
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            ) : (
              <span className="value">{userData.email}</span>
            )}
          </div>
          <div className="key">
            <label htmlFor="phoneNumber">
              <FaPhone />
              Phone Number
            </label>
            {editProfileMode && !isAdminView ? (
              <input
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleInputChange}
              />
            ) : (
              <span className="value">{userData.phoneNumber}</span>
            )}
          </div>
          <div className="prfl_actions">
            {!isAdminView && editProfileMode && (
              <button onClick={handleSaveProfile} className="save_prfl_btn">
                <MdSaveAlt /> Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
