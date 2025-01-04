import { RiUser3Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/userSlice';
import './Header.css';
import { logoutUser, removeUser } from '../../utils/authUtils';
import { FaHeart, FaUser } from 'react-icons/fa6';
import { BsHouseAdd } from 'react-icons/bs';
import { IoMdNotifications, IoMdSettings } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { FaHome } from 'react-icons/fa';
import { GrScheduleNew } from 'react-icons/gr';
const Navbar = () => {
  const { isAuthenticated, user, wishlist, notifications } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = async () => {
    dispatch(logout());
    removeUser();
    setIsDropdownOpen(false);
    toggleDropdown();
    await logoutUser();
  };
  return (
    <nav className="navbar">
      <ul className="nav_list">
        {isAuthenticated && (
          <li>
            <Link className="hdr_nav_link add" to="/add-property">
              <BsHouseAdd className="add_icon" /> Add Property
            </Link>
          </li>
        )}
        <li>
          <Link className="hdr_nav_link" to="/properties/sale">
            Buy
          </Link>
        </li>

        <li>
          <Link className="hdr_nav_link" to="/properties/rent">
            Rent
          </Link>
        </li>
        <li>
          <Link className="hdr_nav_link" to="/listings">
            Listings
          </Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link className="hdr_nav_link" to="/manage-properties">
              My Properties
            </Link>
          </li>
        )}
      </ul>
      {isAuthenticated ? (
        <div className="hdr_user_profile_wl">
          <Link className="hdr_wl_link" to="/wishlist">
            <span className="wl_counter">{wishlist.length}</span>
            <FaHeart />
          </Link>
          <button className="hdr_profile_btn" onClick={toggleDropdown}>
           

            {user?.profilePicture ? (
              <img
                className="usr_ppic"
                src={user?.profilePicture}
                alt="User Profile"
              />
            ) : (
              <RiUser3Line className="icon_profile" />
            )}
          </button>
          {isDropdownOpen && (
            <div className="profile_dropdown">
              <div className="profile_dropdown_content">
                <div className="prf_dd_hdr">
                  <Link
                    onClick={toggleDropdown}
                    to="/user-profile"
                    className="usr_pr_dd_user_link"
                  >
                    <div className="usr_pr_dd_icon">
                      {user?.profilePicture ? (
                        <img
                          className="usr_ppic"
                          src={user?.profilePicture}
                          alt="User Profile"
                        />
                      ) : (
                        <div className="center">
                          <FaUser className="icon_avatar" />
                        </div>
                      )}
                    </div>
                    <div className="user_info_wrap">
                      <div className="dd_user_name">{user?.firstName}</div>
                      <div className="dd_user_email">{user?.email}</div>
                    </div>
                  </Link>
                </div>
                <div className="usr_dd_links">
                  <Link
                    onClick={toggleDropdown}
                    className="usr_dd_link"
                    to="/profile"
                  >
                    <CgProfile />
                    Profile
                  </Link>
                  <Link
                    onClick={toggleDropdown}
                    className="usr_dd_link notf_link"
                    to="/notifications"
                  >
                    <div>
                      <IoMdNotifications /> Notifications
                    </div>
                    <span className="notf_count">
                      <IoMdNotifications />{notifications.length}
                    </span>
                  </Link>
                  <Link
                    onClick={toggleDropdown}
                    className="usr_dd_link"
                    to="/manage-properties"
                  >
                    <FaHome />
                    My Properties
                  </Link>
                  <Link
                    onClick={toggleDropdown}
                    className="usr_dd_link"
                    to="/wishlist"
                  >
                    <FaHeart />
                    Wishlist
                  </Link>

                  <Link
                    onClick={toggleDropdown}
                    className="usr_dd_link"
                    to="/tour-schedules"
                  >
                    {' '}
                    <GrScheduleNew />
                    Tour Schedules
                  </Link>
                  <Link
                    onClick={toggleDropdown}
                    className="usr_dd_link"
                    to="/user-profile"
                  >
                    <IoMdSettings />
                    Settings
                  </Link>
                  <button
                    className="usr_dd_link logout_btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="auth_links">
          <Link className="auth_link login_link" to="/login">
            Login
          </Link>
          <Link className="auth_link signup_link" to="/signup">
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
