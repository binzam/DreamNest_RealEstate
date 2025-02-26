import './UserProfile.css';
import {
  FaCheck,
  FaDeleteLeft,
  FaHeart,
  FaPenToSquare,
  FaPhone,
  FaUpload,
  FaUser,
} from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { MdCancel, MdEmail, MdSaveAlt } from 'react-icons/md';
import { FaEdit, FaHome } from 'react-icons/fa';
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay';
import { GridLoader } from 'react-spinners';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GrScheduleNew } from 'react-icons/gr';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import BackButton from '../../components/BackButton/BackButton';
import {
  useDeleteUser,
  useFetchUserProfile,
  useUpdateUserProfile,
  useUploadProfilePicture,
} from '../../hooks/useUsers';
import type { UserProfile, UserProfileUpdate } from '../../types/userTypes';
import { Loader } from '../../components/Loader';
import { useUser } from '../../context/useUser';
import DeletePropertyModal from '../../components/Modals/DeletePropertyModal/DeletePropertyModal';
import MessageDisplay from '../../components/MessageDisplay/MessageDisplay';
import Container from '../../components/Container/Container';
interface UserProfileProps {
  isAdminView?: boolean;
}

const UserProfile = ({ isAdminView = false }: UserProfileProps) => {
  const { userId } = useParams<{ userId?: string }>();
  const { state } = useUser();
  const navigate = useNavigate();
  const { user } = state;
  const {
    data: userData,
    isLoading: isProfileLoading,
    error: profileError,
  } = useFetchUserProfile(userId!);
  const [formData, setFormData] = useState<UserProfile | null>(null);
  const [profileUpdate, setProfileUpdate] = useState<UserProfileUpdate | null>(
    null
  );
  useEffect(() => {
    if (userData) {
      setFormData(userData);
      setProfileUpdate({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || '',
      });
    }
  }, [userData]);

  const [error, setError] = useState<string | null>(null);
  const updateProfileMutation = useUpdateUserProfile(userId);
  const uploadProfilePictureMutation = useUploadProfilePicture(
    userId,
    setError
  );
  const { mutate: deleteUser } = useDeleteUser();
  const isDeleting = useDeleteUser().isPending;

  const [editProfileMode, setEditProfileMode] = useState(false);
  const [editPhotoMode, setEditPhotoMode] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [isImgloading, setIsImgLoading] = useState(false);
  const [isProfileUpdateLoading, setIsProfileUpdateLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const isAdminViewingOwnProfile = isAdminView && user?._id === userData?.id;
  const canEdit = !isAdminView || isAdminViewingOwnProfile;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState({
    id: '',
    imageUrl: '',
  });
  const [message, setMessage] = useState<string | null>(null);

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
  console.log(userData);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userData) return;
    const { name, value } = e.target;
    setProfileUpdate((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };
  const handleImageUpload = async () => {
    if (!profilePicture) return;
    setIsImgLoading(true);

    uploadProfilePictureMutation.mutate(profilePicture, {
      onSuccess: () => {
        setSuccessMessage('Profile picture updated successfully!');
        setTimeout(() => setSuccessMessage(null), 2000);
        setEditPhotoMode(false);
        setPreviewImage(null);
      },
      onError: () => {},
      onSettled: () => setIsImgLoading(false),
    });
  };

  const handleSaveProfile = () => {
    if (!profileUpdate) return;
    setIsProfileUpdateLoading(true);
    updateProfileMutation.mutate(profileUpdate, {
      onSuccess: () => {
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(null), 2000);
        setEditProfileMode(false);
      },
      onError: () => {
        setError(
          'An error occurred while saving the profile. Please try again.'
        );
      },
      onSettled: () => setIsProfileUpdateLoading(false),
    });
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete({ id: '', imageUrl: '' });
  };
  const openDeleteModal = () => {
    if (!userData) {
      console.error('User data is undefined');
      return;
    }
    setIsDeleteModalOpen(true);
    setUserToDelete({
      id: userData?._id,
      imageUrl: userData?.profilePicture,
    });
  };
  const handleDelete = async (id: string) => {
    if (!id) {
      setMessage('Invalid user ID');
      return;
    }

    deleteUser(id, {
      onSuccess: () => {
        setMessage('User deleted successfully');
        setTimeout(() => {
          setMessage(null);
        }, 3000);
        navigate('/admin/manage-users');
      },
      onError: (error) => {
        if (error instanceof Error) {
          setMessage(error.message || 'Failed to delete User');
        } else {
          setMessage('An unknown error occurred');
        }
      },
    });
    setIsDeleteModalOpen(false);
  };

  if (isProfileLoading) return <Loader />;
  if (profileError) return <ErrorDisplay message={profileError.message} />;
  if (!userData) return <ErrorDisplay message="No user data found" />;

  return (
    <div className="usr_prfl_pge">
      <div className="prfl_hdr">
        <Container>
          <div className="prfl_hdr_inner">
            <div className="back_prfl_wrap">
              <BackButton />
              <div className="prfl_hdr_main">
                {!isAdminView && (
                  <>
                    <h2>Hello there!</h2>
                    <p>
                      <MdEmail /> {formData?.email}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="usr_prl_hdr_info">
              <IoMdInformationCircleOutline />
              {!isAdminViewingOwnProfile && isAdminView ? (
                <>
                  <p>
                    This is
                    <strong> [{formData?.email}] </strong>
                    's profile.
                    <br />
                    Here you can view
                    <strong> {formData?.firstName}'s</strong> properties, tour
                    schedules and wishllist.
                  </p>
                </>
              ) : (
                <p>
                  Here you can edit your personal information, change profile
                  picture and keep track of your essesntials.
                </p>
              )}
            </div>
          </div>
        </Container>
      </div>
      <div className="hdr_actions">
        <div className="usr_prf_acts">
          <Link
            to={
              isAdminView
                ? `/admin/users/${userId}/wishlist?user-email=${formData?.email}`
                : '/wishlist'
            }
          >
            <FaHeart />
            Wishlist
          </Link>
          <span className="usr_prf_act_count">{formData?.wishlistCount}</span>
        </div>
        <div className="usr_prf_acts">
          <Link
            to={
              isAdminView
                ? `/admin/users/${userId}/properties?user-email=${formData?.email}`
                : '/manage-properties'
            }
          >
            <FaHome />
            Properties
          </Link>
          <span className="usr_prf_act_count">{formData?.propertyCount}</span>
        </div>
        <div className="usr_prf_acts">
          <Link
            to={
              isAdminView
                ? `/admin/users/${userId}/tour-schedules?user-email=${formData?.email}`
                : '/tour-schedules'
            }
          >
            <GrScheduleNew /> Tour Schedules
          </Link>
          <span className="usr_prf_act_count">
            {formData?.tourScheduleCount}
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
      <Container>
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
              ) : formData?.profilePicture !== '' ? (
                <img src={formData?.profilePicture} alt="Profile" />
              ) : (
                <FaUser />
              )}
            </div>
            {canEdit && (
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
            {isProfileUpdateLoading && (
              <GridLoader
                color="#13ccbb"
                margin={10}
                size={55}
                className="upload_loading"
              />
            )}
            {canEdit && (
              <>
                {!editProfileMode ? (
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
              {canEdit && editProfileMode ? (
                <input
                  type="text"
                  name="firstName"
                  value={profileUpdate?.firstName}
                  onChange={handleInputChange}
                />
              ) : (
                <span className="value">{profileUpdate?.firstName}</span>
              )}
            </div>
            <div className="key">
              <label htmlFor="lastName">
                <FaUser /> Last Name
              </label>

              {canEdit && editProfileMode ? (
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={profileUpdate?.lastName}
                  onChange={handleInputChange}
                />
              ) : (
                <span className="value">{profileUpdate?.lastName}</span>
              )}
            </div>
            <div className="key">
              <label htmlFor="email">
                <MdEmail />
                Email
              </label>
              {canEdit && editProfileMode ? (
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={profileUpdate?.email}
                  onChange={handleInputChange}
                />
              ) : (
                <span className="value">{profileUpdate?.email}</span>
              )}
            </div>
            <div className="key">
              <label htmlFor="phoneNumber">
                <FaPhone />
                Phone Number
              </label>
              {canEdit && editProfileMode ? (
                <input
                  id="phoneNumber"
                  type="number"
                  name="phoneNumber"
                  value={profileUpdate?.phoneNumber}
                  onChange={handleInputChange}
                />
              ) : (
                <span className="value">{profileUpdate?.phoneNumber}</span>
              )}
            </div>
            <div className="prfl_actions">
              {canEdit && editProfileMode && (
                <button onClick={handleSaveProfile} className="save_prfl_btn">
                  <MdSaveAlt /> Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>

      {isAdminView && (
        <button className="del_usr_btn" onClick={openDeleteModal}>
          {isDeleting ? <Loader /> : <FaDeleteLeft />}
          Delete User
        </button>
      )}
      <MessageDisplay message={message} setMessage={setMessage} />
      <DeletePropertyModal
        removeType="user"
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={() => handleDelete(userToDelete.id)}
        imageUrl={userToDelete.imageUrl}
      />
    </div>
  );
};

export default UserProfile;
