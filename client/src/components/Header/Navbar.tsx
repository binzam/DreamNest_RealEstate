import { RiUser3Line } from 'react-icons/ri';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';
import { logoutUser, removeUser } from '../../utils/authUtils';
import { FaHeart, FaUser } from 'react-icons/fa6';
import { BsHouseAdd } from 'react-icons/bs';
import { IoMdNotifications, IoMdSettings } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { FaHome } from 'react-icons/fa';
import { GrScheduleNew } from 'react-icons/gr';
import { useFetchWishlist } from '../../hooks/useWishlist';
import { useFetchNotification } from '../../hooks/useNotifications';
import { useUser } from '../../context/useUser';
import AuthLinks from '../AuthLinks/AuthLinks';
const Navbar = () => {
  const { state, dispatch } = useUser();
  const { user, isAuthenticated } = state;

  const { data: notifications = [] } = useFetchNotification(isAuthenticated);

  const { data: wishlist = [] } = useFetchWishlist(isAuthenticated);

  const unreadNotifications = notifications.filter(
    (notification: { status: string; }) => notification.status !== 'Read'
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const isAdminMode = user?.role === 'admin';
  const handleLogout = async () => {
    try {
      setIsDropdownOpen(false);

      await logoutUser();

      removeUser();

      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <nav className="navbar">
      <ul className="nav_list">
        {isAuthenticated && (
          <li>
            <NavLink
              to="/add-property"
              className={({ isActive }) =>
                isActive ? 'hdr_nav_link active' : 'hdr_nav_link add'
              }
            >
              <BsHouseAdd className="hdr_add_icon" /> Add Property
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="/properties/sale"
            className={({ isActive }) =>
              isActive ? 'hdr_nav_link active' : 'hdr_nav_link'
            }
          >
            Buy
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/properties/rent"
            className={({ isActive }) =>
              isActive ? 'hdr_nav_link active' : 'hdr_nav_link'
            }
          >
            Rent
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'hdr_nav_link active' : 'hdr_nav_link'
            }
            to="/listings"
          >
            Listings
          </NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'hdr_nav_link active' : 'hdr_nav_link'
              }
              to="/manage-properties"
            >
              My Properties
            </NavLink>
          </li>
        )}
      </ul>
      {isAuthenticated ? (
        <div className="hdr_user_profile_wl">
          {!isAdminMode && (
            <Link className="hdr_wl_link" to="/wishlist">
              <span className="wl_counter">{wishlist?.length}</span>
              <FaHeart />
            </Link>
          )}

          <button className="hdr_profile_btn" onClick={toggleDropdown}>
            {user?.profilePicture ? (
              <img
                className="usr_ppic"
                src={user?.profilePicture}
                alt="User Profile"
              />
            ) : (
              <RiUser3Line  />
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
                        <div>
                          <FaUser />
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
                    to="/user-profile"
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
                      <IoMdNotifications />
                      {unreadNotifications.length}
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
                  {!isAdminMode && (
                    <Link
                      onClick={toggleDropdown}
                      className="usr_dd_link"
                      to="/wishlist"
                    >
                      <FaHeart />
                      Wishlist
                    </Link>
                  )}

                  {!isAdminMode && (
                    <Link
                      onClick={toggleDropdown}
                      className="usr_dd_link"
                      to="/tour-schedules"
                    >
                      {' '}
                      <GrScheduleNew />
                      Tour Schedules
                    </Link>
                  )}
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
        <AuthLinks />
      )}
    </nav>
  );
};

export default Navbar;
